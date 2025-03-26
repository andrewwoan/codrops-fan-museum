import { React, Suspense, useState } from "react";

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
import Background from "./models/Background";

import { cameraCurve, DebugCurve, CameraHelper } from "./utils/curve";
import Fire from "./components/Fire";

const Scene = ({
  cameraGroup,
  camera,
  scrollProgress,
  setscrollProgress,
  targetScrollProgress,
  lerpFactor,
  mouseOffset,
}) => {
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useFrame((state) => {
    if (camera) {
      const newPulseIntensity = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      setPulseIntensity(newPulseIntensity);

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

      const basePoint = cameraCurve.getPoint(newProgress);

      // cameraGroup.current.position.x = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.x,
      //   basePoint.x,
      //   0.1
      // );
      // cameraGroup.current.position.y = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.y,
      //   basePoint.y,
      //   0.1
      // );
      // cameraGroup.current.position.z = THREE.MathUtils.lerp(
      //   cameraGroup.current.position.z,
      //   basePoint.z,
      //   0.1
      // );

      // camera.current.position.x = THREE.MathUtils.lerp(
      //   camera.current.position.x,
      //   basePoint.x,
      //   0.1
      // );
      // camera.current.position.y = THREE.MathUtils.lerp(
      //   camera.current.position.y,
      //   basePoint.y,
      //   0.1
      // );
      // camera.current.position.z = THREE.MathUtils.lerp(
      //   camera.current.position.z,
      //   basePoint.z,
      //   0.1
      // );

      // camera.current.position.x = THREE.MathUtils.lerp(
      //   camera.current.position.x,
      //   mouseOffset.current.x,
      //   0.1
      // );
      // camera.current.position.y = THREE.MathUtils.lerp(
      //   camera.current.position.y,
      //   -mouseOffset.current.y,
      //   0.1
      // );
      // camera.current.position.z = 0;

      // const targetRotation = getLerpedRotation(newProgress);
      // cameraGroup.current.rotation.copy(targetRotation);
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
      <DebugCurve curve={cameraCurve} />

      <Suspense fallback={null}>
        <First />
        <Second />
        <Third />
        <Fourth />
        <Fifth />
        <Sixth />
        <Seventh />
        <Eighth />
        <Ninth />
        <Tenth />
        <Eleventh />
        <Background />

        {/* Braizer Fire */}
        <Fire scale={[1.4, 4, 1.4]} position={[-12.979, 9.52, -14.4]} />
        <Fire scale={[1.4, 4, 1.4]} position={[-9.29, 9.52, -14.4]} />
        <Fire scale={[1.4, 4, 1.4]} position={[21.279, 9.52, -14.4]} />
        <Fire scale={[1.4, 4, 1.4]} position={[24.93, 9.52, -14.4]} />
        <Fire scale={[1.4, 4, 1.4]} position={[28.789, 9.52, -14.4]} />

        {/* Outside Torches Fire */}
        <Fire
          scale={[0.38, 1.4, 0.38]}
          rotation={[0.3, 0, 0]}
          position={[9.1, 10.32, -18.4]}
        />
        <Fire
          scale={[0.38, 1.4, 0.38]}
          rotation={[0.3, 0, 0]}
          position={[3.28, 10.32, -18.4]}
        />

        <Fire
          scale={[0.38, 1.4, 0.38]}
          rotation={[0.3, 0, 0]}
          position={[5.724, 17.3, -15.6]}
        />

        {/* Outside Torches Fire */}
        <Fire scale={[0.38, 2, 0.38]} position={[11.27, 8.62, -27.25]} />
        <Fire scale={[0.38, 2, 0.38]} position={[1.4, 8.62, -27.15]} />
        <Fire scale={[0.38, 2, 0.38]} position={[11.27, 8.62, -45.25]} />
        <Fire scale={[0.38, 2, 0.38]} position={[1.4, 8.62, -45.15]} />
      </Suspense>
    </>
  );
};

export default Scene;
