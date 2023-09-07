import React, { useRef } from "react";
import { Mesh } from "three";
import { type MeshProps, useFrame } from "@react-three/fiber";

type ShapeType = "tetrahedron" | "icossahedron" | "octahedron";

interface IProps extends MeshProps {
  type: ShapeType;
}

export const WireframeShape: React.FC<IProps> = (props: IProps) => {
  const { type } = props;

  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
  });

  const renderGeometry = (type: ShapeType) => {
    switch (type) {
      case "icossahedron":
        return <icosahedronGeometry />;
      case "octahedron":
        return <octahedronGeometry />;
      case "tetrahedron":
        return <tetrahedronGeometry />;
    }
  };

  return (
    <mesh ref={ref} {...props}>
      {renderGeometry(type)}
      <meshBasicMaterial transparent wireframe />
    </mesh>
  );
};
