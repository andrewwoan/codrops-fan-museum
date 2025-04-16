import * as THREE from "three";

export function convertMaterialsToBasic(materials, alphaTestValue = 0) {
  const newMaterials = {};

  Object.keys(materials).forEach((key) => {
    const oldMaterial = materials[key];
    const newMaterial = new THREE.MeshBasicMaterial({
      map: oldMaterial.map,
      transparent: oldMaterial.transparent,
      side: oldMaterial.transparent ? THREE.DoubleSide : THREE.FrontSide,
      alphaTest: oldMaterial.transparent ? 0.4 : alphaTestValue,
    });
    newMaterials[key] = newMaterial;
  });

  return newMaterials;
}
