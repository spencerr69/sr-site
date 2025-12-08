"use client";

import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import {Screen} from "@/app/page";
import {AsciiRenderer} from "@react-three/drei";

type Props = { currentScreen: Screen };

function CameraController({ currentScreen }: Props) {
  const target = useRef(new THREE.Vector3(0, 0, 300));
  // Update target when the screen changes
  useEffect(() => {
    switch (currentScreen) {
      case Screen.Discog:
        target.current.set(-50, 50, 150);
        break;
      case Screen.Home:
      default:
        target.current.set(0, 0, 500);
        break;
    }
  }, [currentScreen]);

  useFrame(({ camera }) => {
    camera.position.lerp(target.current, 0.01);
    camera.rotation.x = camera.position.x / 200;
    camera.rotation.y = camera.position.y / 200;
    camera.updateProjectionMatrix();
  });
  return null;
}

function Planet() {
  const obj = useLoader(OBJLoader, "/sr2planethq.obj");
  const planetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (!planetRef.current) return;
    planetRef.current.scale.set(30, 30, 30);
    planetRef.current.rotation.x = 0.5;
    planetRef.current.rotation.z = 0.2;
  }, []);

  useFrame((state) => {
    const start = state.clock.elapsedTime * 1000; // convert to ms-like scaling
    const obj3d = planetRef.current;
    if (!obj3d) return;
    obj3d.rotation.y = start * -0.0002;
    obj3d.rotation.z = Math.sin(start * 0.0007) * 0.1;
  });

  return <primitive ref={planetRef} object={obj} />;
}

function Stars() {
  const count = 300;
  const positions = new Array(count).fill(0).map(
    () =>
      [
        // eslint-disable-next-line react-hooks/purity
        Math.random() * 2000 - 1000,
        // eslint-disable-next-line react-hooks/purity
        Math.random() * 2000 - 1000,
        // eslint-disable-next-line react-hooks/purity
        Math.random() * 2000 - 1000,
      ] as [number, number, number],
  );

  const refs = useRef<THREE.Mesh[]>([]);
  refs.current = [];

  useFrame((state) => {
    const timer = state.clock.elapsedTime * 1000;
    refs.current.forEach((star) => {
      if (!star) return;
      const s = Math.sin(timer * 0.0007) * 0.1 + 0.9;
      star.scale.set(s, s, s);
      star.position.x += Math.sin(timer * Math.random() * 0.00005) * 0.1;
      star.position.y += Math.sin(timer * Math.random() * 0.00005) * 0.1;
      star.position.z += Math.sin(timer * Math.random() * 0.00005) * 0.1;
      if (star.position.x > 2000) star.position.x = -1000;
      if (star.position.y > 2000) star.position.y = -1000;
      if (star.position.z > 2000) star.position.z = -1000;
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
}

const ThreeScene: React.FC<Props> = ({ currentScreen }) => {
  return (
    <div className="fixed inset-0 asciiEffect font-mono bg-gray-950">
      <Canvas
        camera={{
          fov: 70,
          near: 1,
          far: 10000,
          position: [0, 0, 500],
          rotation: [0, 0, 0],
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Scene background */}
        <color attach="background" args={["black"]} />

        {/* Lights */}
        <pointLight position={[200, 200, 200]} intensity={500000} />
        <pointLight position={[-500, -500, 200]} intensity={50000} />

        {/* Objects */}
        <Stars />
        <Planet />

        {/* Camera controller reacts to currentScreen */}
        <CameraController currentScreen={currentScreen} />

        {/* ASCII effect overlay */}
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

export default ThreeScene;
