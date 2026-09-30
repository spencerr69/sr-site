"use client";

import { Discog } from "@/components/Discog";
import { Links } from "@/components/Links";
import type { SceneView } from "@/components/Scene";
import type { Artist, Release } from "@/lib/definitions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction, useState } from "react";

const queryClient = new QueryClient();

export type StateProps = {
  artistResults: Artist;
  screenSetter: Dispatch<SetStateAction<SceneView>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

export type DiscogProps = {
  discogResults: Release[];
  screenSetter: Dispatch<SetStateAction<SceneView>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

export default function App({
  discogResults,
  artistResults,
}: {
  discogResults: Release[];
  artistResults: Artist;
}) {
  const [currentScreen, setCurrentScreen] = useState<SceneView>("home");

  const [currentSelection, setCurrentSelection] = useState(0);

  const stateProps: StateProps = {
    screenSetter: setCurrentScreen,
    selectionSetter: setCurrentSelection,
    selected: currentSelection,
    artistResults: artistResults,
  };

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          {currentScreen == "home" && <Links {...stateProps} />}
          {currentScreen == "music" && (
            <Discog {...stateProps} discogResults={discogResults} />
          )}
        </div>
      </QueryClientProvider>
    </main>
  );
}
