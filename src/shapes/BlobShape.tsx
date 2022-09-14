import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

export const BlobShape: React.FC = () => {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3, 50, 50]} />
      {
        <MeshDistortMaterial
          color="#f1f1f1"
          emissive="#f1f1f1"
          transparent
          opacity={0.9}
          speed={5}
          distort={0.2}
        />
      }
    </mesh>
  );
};
