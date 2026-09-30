import type { SceneView } from "@/components/scene/Scene";
import { Stars } from "@/components/scene/Stars";
import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

type Props = { view: SceneView };

const TARGETS = {
  home: new THREE.Vector3(0, 0, 500),
  music: new THREE.Vector3(-50, 50, 150),
} as const;

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

useLoader.preload(OBJLoader, "/sr2pbf.obj");

const KEY_LIGHT = 500000;
const FILL_LIGHT = 50000;

function Planet({ motion }: { motion: boolean }) {
  const obj = useLoader(OBJLoader, "/sr2pbf.obj");
  const planet = useRef<THREE.Object3D>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);
  const revealStart = useRef<number | null>(null);

  useFrame(({ clock }) => {
    // the lights mount with the obj, so the first frame they exist starts the ramp
    revealStart.current ??= performance.now();
    const reveal = motion
      ? Math.min(1, (performance.now() - revealStart.current) / 1000)
      : 1;
    if (keyLight.current) keyLight.current.intensity = KEY_LIGHT * reveal;
    if (fillLight.current) fillLight.current.intensity = FILL_LIGHT * reveal;

    if (!motion || !planet.current) return;
    planet.current.rotation.y = clock.elapsedTime * -0.2;
    planet.current.rotation.z = Math.sin(clock.elapsedTime * 0.7) * 0.1;
  });

  return (
    <>
      <pointLight ref={keyLight} position={[200, 200, 200]} intensity={0} />
      <pointLight ref={fillLight} position={[-500, -500, 200]} intensity={0} />
      <primitive
        ref={planet}
        object={obj}
        scale={30}
        rotation={[0.5, 0, 0.2]}
      />
    </>
  );
}

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
        dpr={1}
        gl={{ powerPreference: "low-power", antialias: false }}
      >
        <color args={["black"]} attach="background" />

        <Suspense fallback={null}>
          <Planet motion />
        </Suspense>
        <Stars motion />

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
