import { MathUtils, Mesh, Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Noise } from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import { useMousePosition } from './useMousePosition';
import { ReactComponent as Wordmark } from './wordmark.svg';
import './App.css';

const Scene = () => {
  const Lighting = () => (
    <>
      <directionalLight color="pink" position={[5, 5, 10]} intensity={20} />
      <directionalLight color="green" position={[0, -5, 15]} intensity={25} />
      <directionalLight color="darkBlue" position={[5, 5, 15]} intensity={20} />
    </>
  );

  const Tetrahedron = (props: {position: [number, number, number]}) => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref} {...props}>
        <tetrahedronGeometry />
        <meshBasicMaterial color="white" attach="material" transparent={true} wireframe={true} />
      </mesh>
    );
  };

  const Icosahedron = (props: {position: [number, number, number]}) => {
    const ref = useRef<Mesh>();
    useFrame(() => {
      if (ref.current) ref.current.rotation.x = ref.current.rotation.y += 0.001;
    });

    return (
      <mesh ref={ref} {...props}>
        <icosahedronGeometry />
        <meshBasicMaterial color="white" attach="material" transparent wireframe />
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
        <MeshDistortMaterial color="#f1f1f1" attach="material" opacity={0.98} speed={5} distort={0.2} />
      </mesh>
    );
  };

  const Rig = ({ children }: any) => {
    const DEFAULTZOOM = 3;
    const ref = useRef<Mesh>();
    const vec = new Vector3();
    const { camera, mouse } = useThree();
    useFrame(() => {
      camera.position.lerp(vec.set(mouse.x * 2, 0, DEFAULTZOOM), 0.05);
      if (ref.current) {
        ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 1, -DEFAULTZOOM), 0.1);
        ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, (mouse.x * Math.PI) / 20, 0.1);
      }
    });
    return <group ref={ref}>{children}</group>;
  };

  const Effects = () => {
    const mousePosition = useMousePosition();
    const chromaticAbberationIntensity = 0.000005;

      const chromaticAbberationOffsetX = (mousePosition.x! - (window.innerWidth / 2)) * chromaticAbberationIntensity;
      const chromaticAbberationOffsetY = (mousePosition.y! - (window.innerHeight / 2)) * chromaticAbberationIntensity;

    return (
      <EffectComposer>
        <Bloom luminanceSmoothing={0.9} height={400} />
        <Noise opacity={0.4} />
        <ChromaticAberration offset={[chromaticAbberationOffsetX, chromaticAbberationOffsetY] as any} />
      </EffectComposer>
    );
  };

  return (
    <Canvas>
      <color attach="background" args={["#010101"]} />
      <Suspense fallback={null}>
        <Lighting />
        <Rig>
          <Tetrahedron position={[-6, -2, -4]} />
          <Tetrahedron position={[8, -4, -2]} />
          <Tetrahedron position={[8, 8, -4]} />
          <Tetrahedron position={[10, -8, -8]} />
          <Icosahedron position={[4, 0.5, 3]} />
          <Icosahedron position={[-1, -3, 3]} />
          <Icosahedron position={[-2, 1, 5]} />
          <Tetrahedron position={[-8, 6, -5]} />
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
    </div>
  );
};

export default App;
