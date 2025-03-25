import * as THREE from "three";

export const cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(
      6.577763360438033,
      10.856284964410769,
      24.640379680866076
    ),
    new THREE.Vector3(6.080023517587114, 9.66248066285629, -9.514943289676541),
    new THREE.Vector3(6.13562719183884, 8.94385544864918, -35.15952064804525),
    new THREE.Vector3(
      0.4436610752679034,
      9.095692752216793,
      -45.24820648294106
    ),
    new THREE.Vector3(
      10.832496218694319,
      9.072285787822777,
      -44.99183302104726
    ),
    new THREE.Vector3(5.458086050034908, 8.73452167183442, -38.5039287861451),
    new THREE.Vector3(
      5.984547855718962,
      14.010925354273802,
      -21.804431479523224
    ),
    new THREE.Vector3(5.606929286794663, 17.796052392871356, 6.810478836223162),
    new THREE.Vector3(
      6.665513021683049,
      12.719150249688289,
      19.408420423162653
    ),
  ],
  true
);

export const DebugCurve = ({ curve }) => {
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={"red"} />
    </line>
  );
};

export const CameraHelper = ({ cameraRef }) => {
  useHelper(cameraRef, THREE.CameraHelper);

  return null;
};
