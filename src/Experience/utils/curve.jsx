import * as THREE from "three";

export const cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(
      6.577763360438033,
      window.innerWidth < 764 ? 12 : 8.856284964410769,
      window.innerWidth < 764 ? 31.640379680866076 : 20.640379680866076
    ),
    new THREE.Vector3(6.129, 9.16248066285629, -9.514943289676541),
    new THREE.Vector3(6.139, 9.16248066285629, -25.514943289676541),
    new THREE.Vector3(6.121, 8.58385544864918, -35.5852064804525),
    new THREE.Vector3(6.1, 8.6385544864918, -39.15952064804525),
    new THREE.Vector3(-0.6, 9.095692752216793, -44.84820648294106),
    new THREE.Vector3(
      12.932496218694319,
      9.072285787822777,
      -44.69183302104726
    ),
    new THREE.Vector3(7.458086050034908, 8.73452167183442, -40.5039287861451),
    new THREE.Vector3(
      5.984547855718962,
      14.010925354273802,
      -21.804431479523224
    ),
    new THREE.Vector3(7.75929286794663, 18.796052392871356, 0.810478836223162),
    new THREE.Vector3(-0.25929286794663, 16.796052392871356, 6.810478836223162),
    new THREE.Vector3(
      6.577763360438033,
      window.innerWidth < 764 ? 12 : 8.856284964410769,
      window.innerWidth < 764 ? 31.640379680866076 : 20.640379680866076
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
    rotation: new THREE.Euler(
      window.innerWidth < 764 ? -0.1 : 0,
      0.00479125845971665,
      0.000597178775549178
    ),
  },
  {
    progress: 0.07,
    rotation: new THREE.Euler(
      -0.04277011042878412,
      -0.00866103427209704,
      -0.00037065478236413864
    ),
  },
  {
    progress: 0.2,
    rotation: new THREE.Euler(
      -0.04277011042878412,
      -0.00866103427209704,
      -0.00037065478236413864
    ),
  },
  {
    progress: 0.25,
    rotation: new THREE.Euler(
      -0.8851668165265633,
      0.003786054557443451,
      0.003635853660383532
    ),
  },
  {
    progress: 0.32,
    rotation: new THREE.Euler(
      -0.086339131170143176,
      0.398491298300412,
      -0.1343243154257062
    ),
  },
  {
    progress: 0.36,
    rotation: new THREE.Euler(
      -0.086339131170143176,
      0.708491298300412,
      -0.0143243154257062
    ),
  },
  {
    progress: 0.41,
    rotation: new THREE.Euler(
      -0.046339131170143176,
      0.0298491298300412,
      0.07343243154257062
    ),
  },
  {
    progress: 0.49,
    rotation: new THREE.Euler(
      -0.026015217004565497,
      -0.019361968160347905,
      -0.0405037879475436998
    ),
  },

  {
    progress: 0.61,
    rotation: new THREE.Euler(
      -0.038854519527552256,
      -0.5056419965908544,
      -0.01657632912947032
    ),
  },
  {
    progress: 0.65,
    rotation: new THREE.Euler(
      -0.3535558580154114,
      0.05311086541781096,
      0.005869310093750261
    ),
  },
  {
    progress: 0.75,
    rotation: new THREE.Euler(
      -0.05535558580154114,
      0.32017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 0.8,
    rotation: new THREE.Euler(
      -0.13535558580154114,
      -0.13017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 0.9,
    rotation: new THREE.Euler(
      0.01492353012229583,
      -0.073017130864367585,
      0.02072972153013933
    ),
  },
  {
    progress: 1,
    rotation: new THREE.Euler(
      window.innerWidth < 764 ? -0.1 : 0,
      0.00479125845971665,
      0.000597178775549178
    ),
  },
];

export const createRotationSpline = (targets) => {
  const quaternions = targets.map((target) =>
    new THREE.Quaternion().setFromEuler(target.rotation)
  );

  const progressPoints = targets.map((target) => target.progress);

  return (progress) => {
    let segment = 0;
    while (
      segment < progressPoints.length - 1 &&
      progress > progressPoints[segment + 1]
    ) {
      segment++;
    }

    if (segment === progressPoints.length - 1) {
      return targets[segment].rotation.clone();
    }

    const start = progressPoints[segment];
    const end = progressPoints[segment + 1];
    const t = (progress - start) / (end - start);

    const smoothT = t * t * (3 - 2 * t);

    const q1 = quaternions[segment];
    const q2 = quaternions[segment + 1];

    const resultQuaternion = new THREE.Quaternion();

    if (segment > 0 && segment < progressPoints.length - 2) {
      const q0 = quaternions[segment - 1];
      const q3 = quaternions[segment + 2];

      const tempQ1 = new THREE.Quaternion();
      const tempQ2 = new THREE.Quaternion();

      tempQ1.copy(q1).slerp(q2, smoothT);
      tempQ2.copy(q0).slerp(q3, smoothT);
      resultQuaternion.copy(tempQ1).slerp(tempQ2, smoothT * (1 - smoothT));
    } else {
      resultQuaternion.copy(q1).slerp(q2, smoothT);
    }

    return new THREE.Euler().setFromQuaternion(resultQuaternion);
  };
};
