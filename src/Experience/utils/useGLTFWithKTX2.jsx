import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three-stdlib";

const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath("/basis/");

export function useGLTFWithKTX2(path) {
  const { gl } = useThree();

  return useGLTF(path, true, true, (loader) => {
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
  });
}
