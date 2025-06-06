/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Seventh.glb 
*/

import React, { useMemo } from "react";
import { useGLTFWithKTX2 } from "../utils/useGLTFWithKTX2";
import { convertMaterialsToBasic } from "../utils/convertToBasic";

export default function Model(props) {
  const { nodes, materials } = useGLTFWithKTX2("/models/Seventh.glb");
  const newMaterials = useMemo(
    () => convertMaterialsToBasic(materials),
    [materials]
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Seventh_Floors_Baked.geometry}
        material={newMaterials.Seventh_Four_Baked}
        position={[7.796, 5.736, -12.207]}
      />
    </group>
  );
}
