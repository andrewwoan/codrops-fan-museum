import React, { useMemo, useEffect, useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGLTFWithKTX2 } from "../utils/useGLTFWithKTX2";
import { useAnimations } from "@react-three/drei";

import { convertMaterialsToBasic } from "../utils/convertToBasic";
import { createBirdPath, getBirdPosition } from "../utils/birdPath";

export default function Bird({ time, speed = 0.01, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTFWithKTX2("/models/Bird.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, names } = useAnimations(animations, group);

  const newMaterials = useMemo(
    () => convertMaterialsToBasic(materials),
    [materials]
  );

  const birdPath = useMemo(() => createBirdPath(), []);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.play();
      });
    }
  }, [actions]);

  useEffect(() => {
    if (actions) {
      const action = actions[names[0]];
      if (action) {
        action.time = (time * 1) % action.getClip().duration;
      }
    }
  }, [time, actions, names]);

  useEffect(() => {
    if (group.current) {
      const position = getBirdPosition(birdPath, time, speed);
      group.current.position.copy(position);
    }
  }, [time]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Lol_what_even_is_this" rotation={[0, 0, 0]}>
          <group name="Eagle" rotation={[0, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <group name="White_Eagle" />
            <skinnedMesh
              name="Object_7_Baked"
              geometry={nodes.Object_7_Baked.geometry}
              material={newMaterials.Bird_Real_Baked}
              skeleton={nodes.Object_7_Baked.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
