import type { SceneView } from "@/components/scene/Scene";
import { Stars } from "@/components/scene/Stars";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

type Props = { view: SceneView };

const TARGETS = {
  home: new THREE.Vector3(0, 0, 500),
  music: new THREE.Vector3(-50, 50, 150),
} as const;

const LAMBDA = 1.83; // 1 - e^(-1.83/60) ≈ 0.03: the old per-frame lerp at 60fps, now the same at any frame rate
const PARALLAX = 5; // world units the camera drifts when the pointer is at the edge of the window
const pointer = { x: 0, y: 0 }; // -1..1, written by the pointermove listener
const goal = new THREE.Vector3();

const aim = (camera: THREE.Camera) => {
  camera.rotation.x = camera.position.x / 200;
  camera.rotation.y = camera.position.y / 200;
};

function CameraController({
  view,
  motion,
}: {
  view: SceneView;
  motion: boolean;
}) {
  const invalidate = useThree((state) => state.invalidate);
  const size = useThree((state) => state.size);

  // with frameloop="demand" nothing draws unless asked: redraw after a route change or a resize
  useEffect(() => {
    invalidate();
  }, [view, size, invalidate]);

  useEffect(() => {
    if (!motion || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.x = 1 - (e.clientX / window.innerWidth) * 2;
      pointer.y = 1 - (e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      pointer.x = 0;
      pointer.y = 0;
    };
  }, [motion]);

  useFrame(({ camera }, delta) => {
    goal.copy(TARGETS[view]);
    if (!motion) {
      camera.position.copy(goal);
      aim(camera);
      return;
    }
    goal.x += pointer.y * PARALLAX;
    goal.y += pointer.x * PARALLAX;
    camera.position.lerp(goal, 1 - Math.exp(-LAMBDA * delta));
    aim(camera);
  });

  return null;
}

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
  const motion = !useReducedMotion();

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
        frameloop={motion ? "always" : "demand"}
        gl={{ powerPreference: "low-power", antialias: false }}
      >
        <color args={["black"]} attach="background" />

        <Suspense fallback={null}>
          <Planet motion={motion} />
        </Suspense>
        <Stars motion={motion} />

        <CameraController view={view} motion={motion} />

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
