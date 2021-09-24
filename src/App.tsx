import './App.css';
import { Bloom, ChromaticAberration, EffectComposer, Noise } from '@react-three/postprocessing';
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Mesh, Vector2, Vector3 } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';
import { ReactComponent as Wordmark } from './wordmark.svg';
import React, { Suspense, useRef, useState } from 'react';

const Scene = () => {
  const Tetrahedron = (props: MeshProps) => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref} {...props}>
        <tetrahedronGeometry />
        <meshBasicMaterial transparent wireframe />
      </mesh>
    );
  };

  const Icosahedron = (props: MeshProps) => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref} {...props}>
        <icosahedronGeometry />
        <meshBasicMaterial transparent wireframe />
      </mesh>
    );
  };

  const Octahedron = (props: MeshProps) => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref} {...props}>
        <octahedronGeometry />
        <meshBasicMaterial transparent wireframe />
      </mesh>
    );
  };

  const Core = () => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref}>
        <sphereGeometry args={[3, 50, 50]} />
        <MeshDistortMaterial color="#dddddd" emissive="#dddddd" attach="material" transparent opacity={0.9} speed={5} distort={0.2} />
      </mesh>
    );
  };

  const Rig: React.FC = ({ children }) => {
    const ref = useRef<Mesh>();
    const vec = new Vector3();
    const { camera, mouse } = useThree();

    const DEFAULTZOOM = 3;
    const zoom = window.innerWidth > 800 ? DEFAULTZOOM : DEFAULTZOOM + 2;

    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x * 2, 0, zoom), 0.05);
      if (ref.current) {
        ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * -1, -zoom), 0.1);
        ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, (mouse.x * Math.PI) / 20, 0.1);
      }
    });

    return <group ref={ref}>{children}</group>;
  };

  const Effects = () => {
    const { camera } = useThree();
    const abberationOffsetIntensity = 0.01;
    const [abberationOffset, setAbberationOffset] = useState([0, 0]);

    useFrame(() => setAbberationOffset([camera.position.x * abberationOffsetIntensity, camera.position.y * abberationOffsetIntensity]));

    return (
      <EffectComposer>
        <Bloom luminanceSmoothing={0.9} height={400} />
        <Noise opacity={0.4} />
        <ChromaticAberration offset={new Vector2(...abberationOffset)} />
      </EffectComposer>
    );
  };

  return (
    <Canvas>
      <color attach="background" args={["#010101"]} />
      <Suspense fallback={null}>
        <Rig>
          <Tetrahedron position={[8, -4, -2]} />
          <Tetrahedron position={[4, -7, -6]} />
          <Tetrahedron position={[5, 6, -4]} />
          <Tetrahedron position={[-8, 9, -5]} />
          <Tetrahedron position={[-2, 6, -7]} />
          <Octahedron position={[4, -6, 2]} />
          <Octahedron position={[-10, -6, -6]} />
          <Icosahedron position={[1, 7, 0]} />
          <Icosahedron position={[4, 0.5, 3]} />
          <Icosahedron position={[-1, -4, 2.5]} />
          <Icosahedron position={[-2, 1, 5]} />
          <Core />
        </Rig>
        <Effects />
      </Suspense>
    </Canvas >
  );
};

const App = () => {
  return (
    <div className="app">
      <div className="app-scene">
        <Scene />
      </div>
      <header className="app-header">
        <Wordmark />
      </header>
      <main>
        <p>Delicious Computer is a design and front-end development studio.</p>
      </main>
    </div>
  );
};

export default App;
