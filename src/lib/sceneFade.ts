import { useSyncExternalStore } from "react";

export type SceneFade = "full" | "dim" | "asleep";
export type ScenePart = "top" | "bottom";

const FADE_MS = 600;

let fade: SceneFade = "full";
let part: ScenePart = "top";
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = (nextFade: SceneFade, nextPart: ScenePart) => {
  if (nextFade === fade && nextPart === part) return;
  fade = nextFade;
  part = nextPart;
  for (const listener of listeners) listener();
};

export const sceneFade = {
  dim: () => {
    if (fade !== "full") return;
    emit("dim", part);
    timer = setTimeout(() => {
      emit("asleep", part);
    }, FADE_MS);
  },
  show: (next: ScenePart) => {
    clearTimeout(timer);
    emit("full", next);
  },
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useSceneFade = () =>
  useSyncExternalStore(
    subscribe,
    () => fade,
    () => "full",
  );

export const useScenePart = () =>
  useSyncExternalStore(
    subscribe,
    () => part,
    () => "top",
  );
