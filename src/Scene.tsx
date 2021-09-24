import React, { Suspense, useRef, useState } from "react";
import { MathUtils, Mesh, Vector2, Vector3 } from "three";
import {
  ChromaticAberration,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BlobShape, WireframeShape } from "./shapes";
import "./App.css";

export const Scene: React.FC = () => {
  const Rig: React.FC = ({ children }) => {
    const defaultZoom = 3.5;
    const ref = useRef<Mesh>();
    const vec = new Vector3();
    const { camera, mouse } = useThree();

    const zoom = window.innerWidth > 800 ? defaultZoom : defaultZoom + 2;

    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x * 2, 0, zoom), 0.05);
      if (ref.current) {
        ref.current.position.lerp(
          vec.set(mouse.x * 1, mouse.y * -1, -zoom),
          0.1
        );
        ref.current.rotation.y = MathUtils.lerp(
          ref.current.rotation.y,
          (mouse.x * Math.PI) / 20,
          0.1
        );
      }
    });

    return <group ref={ref}>{children}</group>;
  };

  const Effects = () => {
    const { camera } = useThree();
    const [abberationOffset, setAbberationOffset] = useState([0, 0]);
    const abberationOffsetIntensity = 0.01;

    useFrame(() =>
      setAbberationOffset([
        camera.position.x * abberationOffsetIntensity,
        camera.position.y * abberationOffsetIntensity,
      ])
    );

    return (
      <EffectComposer>
        <Noise opacity={0.1} />
        <ChromaticAberration offset={new Vector2(...abberationOffset)} />
      </EffectComposer>
    );
  };

  return (
    <div className="scene">
      <Canvas dpr={Math.max(window.devicePixelRatio, 2)}>
        <color attach="background" args={["#010101"]} />
        <Suspense fallback={null}>
          <Rig>
            <WireframeShape type="tetrahedron" position={[8, -4, -2]} />
            <WireframeShape type="tetrahedron" position={[4, -7, -6]} />
            <WireframeShape type="tetrahedron" position={[5, 6, -4]} />
            <WireframeShape type="tetrahedron" position={[-8, 9, -5]} />
            <WireframeShape type="tetrahedron" position={[-2, 6, -7]} />
            <WireframeShape type="octahedron" position={[4, -6, 2]} />
            <WireframeShape type="octahedron" position={[-10, -6, -6]} />
            <WireframeShape type="icossahedron" position={[1, 7, 0]} />
            <WireframeShape type="icossahedron" position={[4, 0.5, 3]} />
            <WireframeShape type="icossahedron" position={[-1, -4, 2.5]} />
            <WireframeShape type="icossahedron" position={[-2, 1, 5]} />
            <BlobShape />
          </Rig>
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
};
