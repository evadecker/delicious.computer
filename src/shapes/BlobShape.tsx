import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

export const BlobShape: React.FC = () => {
  const ref = useRef<Mesh>();
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3, 50, 50]} />
      {
        // This type has an error that needs fixing https://github.com/pmndrs/drei/issues/553
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <MeshDistortMaterial
          color="#dddddd"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          emissive="#dddddd"
          eattach="material"
          transparent
          opacity={0.9}
          speed={5}
          distort={0.2}
        />
      }
    </mesh>
  );
};
