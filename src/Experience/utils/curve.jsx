import * as THREE from "three";

export const cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(
      6.577763360438033,
      10.856284964410769,
      20.640379680866076
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

export const rotationTargets = [
  {
    progress: 0,
    rotation: new THREE.Euler(-0.12, 0.17, 0.02),
  },
  {
    progress: 0.14,
    rotation: new THREE.Euler(-0.11, 0.003, 0.0),
  },
  {
    progress: 0.2,
    rotation: new THREE.Euler(-0.11, 0.003, 0.0),
  },
  {
    progress: 0.24,
    rotation: new THREE.Euler(0.173, 1.042, -0.15),
  },
  {
    progress: 0.365,
    rotation: new THREE.Euler(0.023, 0.024, -0.001),
  },
  {
    progress: 0.42,
    rotation: new THREE.Euler(0.177, 0.972, -0.147),
  },
  {
    progress: 0.5,
    rotation: new THREE.Euler(-2.725, 1.02, 2.782),
  },
  {
    progress: 0.56,
    rotation: new THREE.Euler(-2.9, -0.069, -3.125),
  },
  {
    progress: 0.62,
    rotation: new THREE.Euler(-2.76, 0.21, 3.06),
  },
  {
    progress: 0.715,
    rotation: new THREE.Euler(-0.467, -0.681, -0.308),
  },
  {
    progress: 0.735,
    rotation: new THREE.Euler(-0.043, 0.012, 0.0005),
  },
  {
    progress: 0.85,
    rotation: new THREE.Euler(-0.043, 0.012, 0.0005),
  },
  {
    progress: 1,
    rotation: new THREE.Euler(-0.12, 0.17, 0.02),
  },
];
