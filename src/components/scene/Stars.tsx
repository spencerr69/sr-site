import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 150;
const BOUND = 600; // stars live in a cube from -500 to 500 on every axis

const pseudorandom = (i: number) => {
  let seed = i;
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
};

const random = pseudorandom(1);
const spread = () => random() * BOUND * 2 - BOUND;

// built once at module scope, so re-renders never rebuild them
const STARS = Array.from({ length: COUNT }, () => ({
  position: new THREE.Vector3(spread(), spread(), spread()),
  velocity: new THREE.Vector3(
    random() - 0.5,
    random() - 0.5,
    random() - 0.5,
  ).multiplyScalar(9), // units per second
  phase: random() * Math.PI * 2,
  speed: 0.5 + random() * 1.5, // twinkle, radians per second
}));

const dummy = new THREE.Object3D();
const colour = new THREE.Color();
const wrap = (v: number) =>
  THREE.MathUtils.euclideanModulo(v + BOUND, BOUND * 2) - BOUND;

function place(mesh: THREE.InstancedMesh, elapsed: number) {
  STARS.forEach((star, i) => {
    dummy.position.copy(star.position);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    colour.setScalar(0.75 + 0.25 * Math.sin(elapsed * star.speed + star.phase));
    mesh.setColorAt(i, colour);
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

export function Stars({ motion }: { motion: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  // place them once so the first frame is right even with motion off
  useLayoutEffect(() => {
    if (mesh.current) place(mesh.current, 0);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!motion || !mesh.current) return;
    for (const star of STARS) {
      star.position.addScaledVector(star.velocity, delta);
      star.position.set(
        wrap(star.position.x),
        wrap(star.position.y),
        wrap(star.position.z),
      );
    }
    place(mesh.current, clock.elapsedTime);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[3, 3, 3]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}
