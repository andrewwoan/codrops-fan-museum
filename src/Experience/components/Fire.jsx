import * as THREE from "three";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { extend, useLoader } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";
import { useExperienceStore } from "../../stores/experienceStore";
import { getAudioFileExtension } from "../../utils/platformDetector";

// Fire shader credits to drcmda
// See here: https://codesandbox.io/p/sandbox/3878x

class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { ITERATIONS: "10", OCTIVES: "3" },
      uniforms: {
        fireTex: { type: "t", value: null },
        color: { type: "c", value: null },
        time: { type: "f", value: 0.0 },
        seed: { type: "f", value: 0.0 },
        invModelMatrix: { type: "m4", value: null },
        scale: { type: "v3", value: null },
        noiseScale: { type: "v4", value: new THREE.Vector4(1, 2, 1, 0.3) },
        magnitude: { type: "f", value: 2.5 },
        lacunarity: { type: "f", value: 3.0 },
        gain: { type: "f", value: 0.25 },
      },
      vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          }`,
      fragmentShader: `
      //    Simplex 3D Noise 
        //    by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
          vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

          float snoise(vec3 v){ 
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

            // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;

            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            //  x0 = x0 - 0. + 0.0 * C 
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1. + 3.0 * C.xxx;

            // Permutations
            i = mod(i, 289.0 ); 
            vec4 p = permute( permute( permute( 
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

            // Gradients
            // ( N*N points uniformly over a square, mapped onto an octahedron.)
            float n_ = 1.0/7.0; // N=7
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

            //Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                          dot(p2,x2), dot(p3,x3) ) );
          }
  
          uniform vec3 color;
          uniform float time;
          uniform float seed;
          uniform mat4 invModelMatrix;
          uniform vec3 scale;
          uniform vec4 noiseScale;
          uniform float magnitude;
          uniform float lacunarity;
          uniform float gain;
          uniform sampler2D fireTex;
          varying vec3 vWorldPos;              
  
          float turbulence(vec3 p) {
            float sum = 0.0;
            float freq = 1.0;
            float amp = 1.0;
            for(int i = 0; i < OCTIVES; i++) {
              sum += abs(snoise(p * freq)) * amp;
              freq *= lacunarity;
              amp *= gain;
            }
            return sum;
          }
  
          vec4 samplerFire (vec3 p, vec4 scale) {
            vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
            if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
            p.y -= (seed + time) * scale.w;
            p *= scale.xyz;
            st.y += sqrt(st.y) * magnitude * turbulence(p);
            if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
            return texture2D(fireTex, st);
          }
  
          vec3 localize(vec3 p) {
            return (invModelMatrix * vec4(p, 1.0)).xyz;
          }
  
          void main() {
            vec3 rayPos = vWorldPos;
            vec3 rayDir = normalize(rayPos - cameraPosition);
            float rayLen = 0.0388 * length(scale.xyz);
            vec4 col = vec4(0.0);
            for(int i = 0; i < ITERATIONS; i++) {
              rayPos += rayDir * rayLen;
              vec3 lp = localize(rayPos);
              lp.y += 0.5;
              lp.xz *= 2.0;
              col += samplerFire(lp, noiseScale);
            }
            float alpha = col.r; 
            // alpha = smoothstep(0.4, 0.5, alpha);
            col.a = alpha;

            col.rgb *= 1.05; 

            
            if (col.a < 0.1) discard; 

            gl_FragColor = col;
          }`,
    });
  }
}

extend({ FireMaterial });

function FireElement({ color, time, withAudio = false, ...props }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const audioRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/images/fire.png");
  const { isExperienceReady } = useExperienceStore();

  useLayoutEffect(() => {
    if (!materialRef.current) return;

    texture.magFilter = texture.minFilter = THREE.LinearFilter;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    materialRef.current.uniforms.fireTex.value = texture;
    materialRef.current.uniforms.color.value =
      color || new THREE.Color(0xeeeeee);
    materialRef.current.uniforms.invModelMatrix.value = new THREE.Matrix4();
    materialRef.current.uniforms.scale.value = new THREE.Vector3(1, 1, 1);
    materialRef.current.uniforms.seed.value = Math.random() * 19.19;
  }, [texture, color]);

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    const invModelMatrix = materialRef.current.uniforms.invModelMatrix.value;
    meshRef.current.updateMatrixWorld();
    invModelMatrix.copy(meshRef.current.matrixWorld).invert();
    materialRef.current.uniforms.time.value = time;
    materialRef.current.uniforms.invModelMatrix.value = invModelMatrix;
    materialRef.current.uniforms.scale.value = meshRef.current.scale;
  }, [time]);

  useEffect(() => {
    if (audioRef.current && isExperienceReady && withAudio) {
      try {
        audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  }, [isExperienceReady, withAudio]);

  return (
    <mesh ref={meshRef} {...props} renderOrder={1}>
      <boxGeometry />
      <fireMaterial ref={materialRef} transparent depthWrite={false} />
      {withAudio && (
        <PositionalAudio
          ref={audioRef}
          url={`audio/sfx/torch.${getAudioFileExtension()}`}
          distance={1}
          maxDistance={1}
          loop
        />
      )}
    </mesh>
  );
}

export default function Fire({ time, ...props }) {
  return (
    <group {...props}>
      {/* Braizer Fires */}
      <FireElement
        time={time}
        scale={[1.4, 4, 1.4]}
        position={[-13.1, 9.52, -14.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[1.4, 4, 1.4]}
        position={[-9.29, 9.52, -14.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[1.4, 4, 1.4]}
        position={[21.279, 9.52, -14.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[1.4, 4, 1.4]}
        position={[25, 9.52, -14.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[1.4, 4, 1.4]}
        position={[28.789, 9.52, -14.4]}
        withAudio={true}
      />

      {/* Outside Torches */}
      <FireElement
        time={time}
        scale={[0.38, 1.4, 0.38]}
        rotation={[0.3, 0, 0]}
        position={[9.1, 10.32, -18.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[0.38, 1.4, 0.38]}
        rotation={[0.3, 0, 0]}
        position={[3.28, 10.32, -18.4]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[0.38, 1.4, 0.38]}
        rotation={[0.3, 0, 0]}
        position={[5.69, 17.25, -15.49]}
        withAudio={true}
      />

      {/* Inside Torches with Positional Audio */}
      <FireElement
        time={time}
        scale={[0.38, 2, 0.38]}
        position={[11.27, 8.62, -27.25]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[0.38, 2, 0.38]}
        position={[1.4, 8.62, -27.15]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[0.38, 2, 0.38]}
        position={[11.27, 8.62, -45.25]}
        withAudio={true}
      />
      <FireElement
        time={time}
        scale={[0.38, 2, 0.38]}
        position={[1.4, 8.62, -45.15]}
        withAudio={true}
      />
    </group>
  );
}
