import type { SceneView } from "@/components/scene/Scene";
import { Stars } from "@/components/scene/Stars";
import { exitSwoop } from "@/lib/exitSwoop";
import { useSceneFade } from "@/lib/sceneFade";
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
const DIVE = new THREE.Vector3(0, 0, 95);
const DIVE_LAMBDA = 2.2;

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

  const jump = useRef(false); // set on a bfcache restore: the next frame snaps instead of lerping

  // a cancelled navigation (esc, offline) must not leave the next route diving
  useEffect(() => {
    exitSwoop.reset();
  }, [view]);

  // back from linkr via bfcache resumes this page mid-dive: clear it and snap back to the route
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      exitSwoop.reset();
      jump.current = true;
      invalidate();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [invalidate]);

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
    const diving = motion && exitSwoop.isDiving();
    goal.copy(diving ? DIVE : TARGETS[view]);
    if (!motion || jump.current) {
      jump.current = false;
      camera.position.copy(goal);
      aim(camera);
      return;
    }
    if (!diving) {
      goal.x += pointer.y * PARALLAX;
      goal.y += pointer.x * PARALLAX;
    }
    camera.position.lerp(
      goal,
      1 - Math.exp(-(diving ? DIVE_LAMBDA : LAMBDA) * delta),
    );
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
  const spin = useRef(0);

  useFrame((_, delta) => {
    revealStart.current ??= performance.now();
    const reveal = motion
      ? Math.min(1, (performance.now() - revealStart.current) / 1000)
      : 1;
    if (keyLight.current) keyLight.current.intensity = KEY_LIGHT * reveal;
    if (fillLight.current) fillLight.current.intensity = FILL_LIGHT * reveal;
    if (!motion || !planet.current) return;
    spin.current += delta;
    planet.current.rotation.y = spin.current * -0.2;
    planet.current.rotation.z = Math.sin(spin.current * 0.7) * 0.1;
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
  const fade = useSceneFade();

  return (
    <div
      className={"fixed inset-0 asciiEffect font-mono bg-background"}
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
        className={fade === "full" ? "scene-layer" : "scene-layer scene-dim"}
        dpr={1}
        frameloop={motion && fade !== "asleep" ? "always" : "demand"}
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
          fgColor="var(--foreground)"
          bgColor="var(--background)"
        />
      </Canvas>
    </div>
  );
};

export default FiberScene;
