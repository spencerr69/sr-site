import type { SceneView } from "@/components/Scene";
import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

type Props = { view: SceneView };

const TARGETS = {
  home: new THREE.Vector3(0, 0, 500),
  music: new THREE.Vector3(-50, 50, 150),
} as const;

const pseudorandom = (i: number) => {
  let seed = i;
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
};

const CameraController = ({ view }: Props) => {
  const target = TARGETS[view];

  useFrame(({ camera }) => {
    camera.position.lerp(target, 0.03);
    camera.rotation.x = camera.position.x / 200;
    camera.rotation.y = camera.position.y / 200;
    camera.updateProjectionMatrix();
  });

  return <></>;
};

const Stars = () => {
  const random = pseudorandom(1);

  const count = 100;
  const positions = new Array(count).fill(0).map(() => {
    return new THREE.Vector3(
      random() * 1000 - 500,
      random() * 1000 - 500,
      random() * 1000 - 500,
    );
  });

  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const start = state.clock.elapsedTime * 1000; //seconds to ms
    refs.current.forEach((star) => {
      const scale = Math.sin(start * 0.0007) * 0.1 + 1.0;
      star.scale.set(scale, scale, scale);

      const movement = Math.sin(start * Math.random() * 0.00005) * 0.01;
      star.position.x += movement;
      star.position.y += movement;
      star.position.z += movement;

      if (star.position.x > 500) star.position.x = -500;
      if (star.position.y > 500) star.position.y = -500;
      if (star.position.z > 500) star.position.z = -500;
    });
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[4, 4, 4]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      ))}
    </group>
  );
};

const Planet = () => {
  const obj = useLoader(OBJLoader, "/sr2pbf.obj");
  const planet = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (!planet.current) return;
    planet.current.scale.set(30, 30, 30);
    planet.current.position.set(0, 0, 0);
    planet.current.rotation.x = 0.5;
    planet.current.rotation.z = 0.2;
  }, []);

  useFrame((state) => {
    const start = state.clock.elapsedTime * 1000; // seconds to ms
    const currentPlanet = planet.current;
    if (!currentPlanet) return;
    currentPlanet.rotation.y = start * -0.0002;
    currentPlanet.rotation.z = Math.sin(start * 0.0007) * 0.1;
  });

  return <primitive ref={planet} object={obj} />;
};

const FiberScene: React.FC<Props> = ({ view }) => {
  return (
    <div
      className={"fixed inset-0 asciiEffect font-mono bg-gray-950"}
      aria-hidden
    >
      <Canvas
        camera={{
          fov: 70,
          near: 1,
          far: 1000,
          position: TARGETS[view].toArray(),
          rotation: [0, 0, 0],
        }}
        className={"absolute inset-0"}
      >
        <color args={["black"]} attach="background" />

        <pointLight position={[200, 200, 200]} intensity={500000} />
        <pointLight position={[-500, -500, 200]} intensity={50000} />

        <Planet />
        <Stars />

        <CameraController view={view} />

        <AsciiRenderer
          invert
          characters=" .,spencerraymond,"
          fgColor="white"
          bgColor="#0a0a0a"
        />
      </Canvas>
    </div>
  );
};

export default FiberScene;
