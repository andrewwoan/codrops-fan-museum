/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Background.glb 
*/

import React, { useMemo } from "react";
import { useGLTF, Instances, Instance } from "@react-three/drei";
import { convertMaterialsToBasic } from "../utils/convertToBasic";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/Background.glb");

  const newMaterials = useMemo(
    () => convertMaterialsToBasic(materials),
    [materials]
  );

  return (
    <Instances
      limit={4}
      geometry={nodes.background.geometry}
      material={newMaterials.background}
      {...props}
    >
      {/* First instance */}
      <Instance
        position={[-170.311, 66.468, -124.652]}
        rotation={[Math.PI / 2, 0, -0.765]}
        scale={210.189}
      />

      <Instance
        position={[-170.311, 44.468, -54.652]}
        rotation={[Math.PI / 2, 0, -1.765]}
        scale={205.189}
      />

      {/* Second instance */}
      <Instance
        position={[190.311, 28.468, -118.652]}
        rotation={[Math.PI / 2, 0, 0.5]}
        scale={211}
      />

      <Instance
        position={[200.311, -42.468, -90.652]}
        rotation={[Math.PI / 2, 0, 0.2]}
        scale={145}
      />
    </Instances>
  );
}

useGLTF.preload("/models/Background.glb");
