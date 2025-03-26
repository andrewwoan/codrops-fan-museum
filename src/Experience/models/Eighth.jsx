import React, { useRef, useEffect } from "react";
import { Instance, Instances } from "@react-three/drei";
import { useGLTFWithKTX2 } from "../utils/useGLTFWithKTX2";
import { convertMaterialsToBasic } from "../utils/convertToBasic";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader material for tree sway
const TreeSwayMaterial = React.forwardRef((props, ref) => {
  const uniforms = useRef({
    time: { value: 0 },
    swayAmount: { value: 0.3 },
    swaySpeed: { value: 0.7 },
    baseFrequency: { value: 0.8 },
    map: { value: props.map },
  });

  useFrame((state) => {
    uniforms.current.time.value = state.clock.getElapsedTime();
  });

  const vertexShader = `
    uniform float time;
uniform float swayAmount;
uniform float swaySpeed;
uniform float baseFrequency;

attribute float instanceScale;

varying vec2 vUv;
varying float vHeight;

void main() {
  vUv = uv;
  vHeight = position.y;
  
  // Normalized height (0 at base, 1 at top)
  float normalizedHeight = position.y / 10.0; // Adjust divisor based on your tree height
  
  // Multi-frequency sway for more organic movement
  float sway1 = sin(time * swaySpeed * 0.8 + position.x * baseFrequency) * 0.5;
  float sway2 = cos(time * swaySpeed * 1.3 + position.z * baseFrequency * 1.7) * 0.3;
  float sway3 = sin(time * swaySpeed * 0.5 + position.x * baseFrequency * 0.3) * 0.2;
  
  // Combine sway effects with more influence at the top
  float combinedSway = (sway1 + sway2 + sway3) * swayAmount;
  float trunkStiffness = 1.0 - smoothstep(0.0, 0.3, normalizedHeight); // Stiffer at base
  
  // Apply sway with height influence and trunk stiffness
  vec3 swayedPosition = position;
  swayedPosition.x += combinedSway * 0.3 * normalizedHeight * (1.0 - trunkStiffness);
  swayedPosition.z += combinedSway * 0.4 * normalizedHeight * (1.0 - trunkStiffness);
  
  // Add slight vertical movement for leaf flutter
  swayedPosition.y += sin(time * swaySpeed * 2.0 + position.x) * 0.02 * normalizedHeight;
  
  // Wind direction variation
  float windDirection = sin(time * 0.1) * 0.5 + 0.5;
  swayedPosition.xz += windDirection * combinedSway * 0.1 * normalizedHeight;
  
  // Transform the position
  vec4 modelPosition = instanceMatrix * vec4(swayedPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}
  `;

  const fragmentShader = `
    uniform sampler2D map; // Texture uniform
    varying vec2 vUv;
    varying float vHeight;
    
    void main() {
      // Use the texture with original colors
      vec4 texColor = texture2D(map, vUv);
        if (texColor.a < 0.1) discard;

      gl_FragColor = texColor;
    }
  `;

  return (
    <shaderMaterial
      ref={ref}
      uniforms={uniforms.current}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent={true}
      alphaTest={0.5}
      side={THREE.DoubleSide}
      renderOrder={1}
    />
  );
});

export default function Model(props) {
  const { nodes, materials } = useGLTFWithKTX2("/models/Eighth.glb");
  const newMaterials = convertMaterialsToBasic(materials);
  const materialRef = useRef();

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Eighth_Baked.geometry}
        material={newMaterials.Eighth_Baked}
        position={[-5.2, 9.818, -23.394]}
        rotation={[0, -0.091, 0]}
        renderOrder={2}
      />
      <Instances limit={10} geometry={nodes.Eighth_Tree_Baked.geometry}>
        <TreeSwayMaterial
          ref={materialRef}
          map={newMaterials.Eighth_Baked.map}
          transparent={newMaterials.Eighth_Baked.transparent}
          alphaTest={newMaterials.Eighth_Baked.alphaTest}
        />
        <Instance
          position={[29.885, -1.852, -2.243]}
          rotation={[0.093, 0.914, -0.048]}
          scale={0.9}
        />
        <Instance
          position={[13, -1.852, 3.543]}
          rotation={[0.093, 0.914, -0.048]}
          scale={0.82}
        />
        <Instance
          position={[-1.885, -1.852, 3.243]}
          rotation={[0.093, 0.914, -0.048]}
          scale={0.9}
        />
        <Instance
          position={[21.885, -1.852, 0.243]}
          rotation={[0.093, 0.32, -0.048]}
          scale={1}
        />
        <Instance
          position={[-10, -1.852, -2.243]}
          rotation={[0.093, 0.5, -0.048]}
          scale={1}
        />
        <Instance
          position={[-20, 3.852, -2.243]}
          rotation={[0.093, 1.2, -0.048]}
          scale={0.8}
        />
        <Instance
          position={[-22, 4.852, -15.243]}
          rotation={[0.093, 0.3, -0.048]}
          scale={1.2}
        />
        <Instance
          position={[-19, 4.252, -25.243]}
          rotation={[0.093, 0.45, -0.048]}
          scale={1.4}
        />
        <Instance
          position={[39.885, 2.252, -23.243]}
          rotation={[0.093, 1.5, -0.048]}
          scale={1.2}
        />
        <Instance
          position={[39.885, 2.252, -45.243]}
          rotation={[0.093, 1.1, -0.048]}
          scale={2}
        />
      </Instances>
    </group>
  );
}
