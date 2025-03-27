import * as THREE from "three";

export const createBirdPath = () => {
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-90, 25, -45),
      new THREE.Vector3(90, 40, -45),
      new THREE.Vector3(100, 50, -90),
      new THREE.Vector3(50, 65, -90),
      new THREE.Vector3(-120, 25, -65),
    ],
    true
  );

  return curve;
};

export const getBirdPosition = (curve, time, speed = 0.1) => {
  const t = (time * speed) % 1;
  return curve.getPointAt(t);
};

export const getBirdOrientation = (curve, time, speed = 0.1) => {
  const t = (time * speed) % 1;

  const currentPos = curve.getPointAt(t);

  const lookAheadAmount = 0.001;

  let nextT;
  if (t + lookAheadAmount >= 1) {
    nextT = t + lookAheadAmount - 1;
  } else {
    nextT = t + lookAheadAmount;
  }

  const targetPos = curve.getPointAt(nextT);

  const tempObj = new THREE.Object3D();

  tempObj.position.copy(currentPos);

  tempObj.lookAt(targetPos);

  return tempObj.rotation.clone();
};
