import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function WaterfallModel({
  time,
  speed = 0.1,
  repeatY = 1,
  edgeFade = 0.1,
  tintColor = [0.651, 0.604, 0.702],
  tintIntensity = 1,
  ...props
}) {
  const { nodes } = useGLTF("/models/Waterfall.glb");
  const texture = useTexture("/images/waterfall.webp");
  const shaderRef = useRef();
  const meshRef = useRef();

  const bounds = useMemo(() => {
    if (!nodes.Waterfall.geometry.boundingBox) {
      nodes.Waterfall.geometry.computeBoundingBox();
    }
    return nodes.Waterfall.geometry.boundingBox;
  }, [nodes.Waterfall.geometry]);

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, repeatY);
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;

      if (!texture.generateMipmaps) {
        texture.generateMipmaps = true;
        texture.needsUpdate = true;
      }

      texture.onUpdate = () => {
        if (shaderRef.current) {
          shaderRef.current.uniforms.textureAspect.value =
            texture.image.width / texture.image.height;
          shaderRef.current.uniforms.repeatY.value = repeatY;
        }
      };
    }
  }, [texture, repeatY]);

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = time;
    }
  }, [time]);

  const waterfallMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: time },
      map: { value: texture },
      textureAspect: { value: 0.7 },
      repeatY: { value: repeatY },
      edgeFade: { value: edgeFade },
      boundsMin: { value: bounds?.min || new THREE.Vector3() },
      boundsMax: { value: bounds?.max || new THREE.Vector3() },
      tintColor: { value: new THREE.Vector3().fromArray(tintColor) },
      tintIntensity: { value: tintIntensity },
    },
    vertexShader: `
      uniform vec3 boundsMin;
      uniform vec3 boundsMax;
      varying vec2 vUv;
      varying float vWidthFactor;
      
      void main() {
        vUv = uv;
        
        // Calculate horizontal position factor (0-1 across the width)
        float width = boundsMax.x - boundsMin.x;
        vWidthFactor = (position.x - boundsMin.x) / width;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform sampler2D map;
      uniform float textureAspect;
      uniform float repeatY;
      uniform float edgeFade;
      uniform vec3 tintColor;
      uniform float tintIntensity;
      varying vec2 vUv;
      varying float vWidthFactor;
      
      void main() {
        vec2 uv = vUv;
        uv.x = (uv.x - 0.5) / textureAspect + 0.5;
        
        // Scrolling effect with mirroring
        float scroll = time * ${speed};
        float phase = -uv.y * repeatY + scroll;
        float wrapped = mod(phase, 2.0);
        uv.y = (wrapped > 1.0) ? 2.0 - wrapped : wrapped;
        
        // Sample texture
        vec4 color = texture2D(map, uv);
        
        // Edge fading based on mesh width
        float fade = smoothstep(0.0, edgeFade, vWidthFactor) * 
                    (1.0 - smoothstep(1.0 - edgeFade, 1.0, vWidthFactor));
        
        // Apply fading
        color.a *= fade;
        
        // Add some tint to it to blend better
        vec3 tintedColor = mix(color.rgb, color.rgb * tintColor, tintIntensity);
        color.rgb = tintedColor;
        
        gl_FragColor = color;
      }
  `,
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={nodes.Waterfall.geometry}
        material={waterfallMaterial}
        position={[32.444, 68.9, -73.738]}
        rotation={[Math.PI, -1.45, Math.PI]}
      >
        <primitive
          object={waterfallMaterial}
          ref={shaderRef}
          attach="material"
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Waterfall.glb");
