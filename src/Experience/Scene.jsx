import { React, Suspense, useState, useRef } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import First from "./models/First";
import Second from "./models/Second";
import Third from "./models/Third";
import Fourth from "./models/Fourth";
import Fifth from "./models/Fifth";
import Sixth from "./models/Sixth";
import Seventh from "./models/Seventh";
import Eighth from "./models/Eighth";
import Ninth from "./models/Ninth";
import Tenth from "./models/Tenth";
import Eleventh from "./models/Eleventh";
import Bird from "./models/Bird";
import Background from "./models/Background";
import {
  cameraCurve,
  DebugCurve,
  CameraHelper,
  rotationTargets,
} from "./utils/curve";
import Fire from "./components/Fire";
import WaterFall from "./components/WaterFall";

const Scene = ({
  cameraGroup,
  camera,
  scrollProgress,
  setscrollProgress,
  targetScrollProgress,
  lerpFactor,
  mousePositionOffset,
  mouseRotationOffset,
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [rotationBuffer, setRotationBuffer] = useState(
    new THREE.Euler().copy(rotationTargets[0].rotation)
  );
  const timeRef = useRef(0);

  const getLerpedRotation = (progress) => {
    for (let i = 0; i < rotationTargets.length - 1; i++) {
      const start = rotationTargets[i];
      const end = rotationTargets[i + 1];
      if (progress >= start.progress && progress <= end.progress) {
        const lerpFactor =
          (progress - start.progress) / (end.progress - start.progress);

        const startQuaternion = new THREE.Quaternion().setFromEuler(
          start.rotation
        );
        const endQuaternion = new THREE.Quaternion().setFromEuler(end.rotation);

        const lerpingQuaternion = new THREE.Quaternion();
        lerpingQuaternion.slerpQuaternions(
          startQuaternion,
          endQuaternion,
          lerpFactor
        );

        const lerpedRotation = new THREE.Euler().setFromQuaternion(
          lerpingQuaternion
        );
        return lerpedRotation;
      }
    }

    return rotationTargets[rotationTargets.length - 1].rotation;
  };

  useFrame((state) => {
    if (camera) {
      timeRef.current = state.clock.getElapsedTime();
      const newPulseIntensity = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      setPulseIntensity(newPulseIntensity);

      // Lerp to new position
      let newProgress = THREE.MathUtils.lerp(
        scrollProgress,
        targetScrollProgress.current,
        lerpFactor
      );

      if (newProgress > 1) {
        newProgress = 0;
        targetScrollProgress.current = 0;
      } else if (newProgress < 0) {
        newProgress = 1;
        targetScrollProgress.current = 1;
      }

      setscrollProgress(newProgress);

      // Lerp to new camera offset position
      const basePoint = cameraCurve.getPoint(newProgress);

      cameraGroup.current.position.x = THREE.MathUtils.lerp(
        cameraGroup.current.position.x,
        basePoint.x,
        0.1
      );
      cameraGroup.current.position.y = THREE.MathUtils.lerp(
        cameraGroup.current.position.y,
        basePoint.y,
        0.1
      );
      cameraGroup.current.position.z = THREE.MathUtils.lerp(
        cameraGroup.current.position.z,
        basePoint.z,
        0.1
      );

      camera.current.position.x = THREE.MathUtils.lerp(
        camera.current.position.x,
        mousePositionOffset.current.x,
        0.1
      );
      camera.current.position.y = THREE.MathUtils.lerp(
        camera.current.position.y,
        -mousePositionOffset.current.y,
        0.1
      );
      camera.current.position.z = 0;

      // Get the base camera rotation from your existing system
      const targetRotation = getLerpedRotation(newProgress);

      // Apply smoothing to base rotation
      const smoothedRotation = new THREE.Euler(
        THREE.MathUtils.lerp(rotationBuffer.x, targetRotation.x, 0.05),
        THREE.MathUtils.lerp(rotationBuffer.y, targetRotation.y, 0.05),
        THREE.MathUtils.lerp(rotationBuffer.z, targetRotation.z, 0.05)
      );

      // Update the rotation buffer
      setRotationBuffer(smoothedRotation);

      // Apply the base rotation to the camera group
      cameraGroup.current.rotation.copy(smoothedRotation);

      // Add mouse-based rotation to the camera itself (local rotation)
      camera.current.rotation.x = THREE.MathUtils.lerp(
        camera.current.rotation.x,
        -mouseRotationOffset.current.x,
        0.1
      );
      camera.current.rotation.y = THREE.MathUtils.lerp(
        camera.current.rotation.y,
        -mouseRotationOffset.current.y,
        0.1
      );
    }
  });

  return (
    <>
      <Environment
        background={true}
        backgroundRotation={[0, Math.PI / 2, 0]}
        files={[
          "/cubemap/px.webp",
          "/cubemap/nx.webp",
          "/cubemap/py.webp",
          "/cubemap/ny.webp",
          "/cubemap/pz.webp",
          "/cubemap/nz.webp",
        ]}
      />
      <fogExp2 attach="fog" color="#403e3e" density={0.0125} />
      {/* <DebugCurve curve={cameraCurve} /> */}

      <Suspense fallback={null}>
        <First />
        <Second />
        <Third />
        <Fourth />
        <Fifth />
        <Sixth />
        <Seventh />
        <Eighth time={timeRef.current} />
        <Ninth progress={scrollProgress} pulseIntensity={pulseIntensity} />
        <Tenth />
        <Eleventh />
        <Bird time={timeRef.current} position={[-20, 40, -45]} scale={0.02} />
        <Background />
        <Fire time={timeRef.current} />
        <WaterFall time={timeRef.current} />
      </Suspense>
    </>
  );
};

export default Scene;
