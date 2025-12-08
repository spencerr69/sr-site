"use client";

import ThreeScene from "@/components/ThreeScene";
import { Dispatch, SetStateAction, useState } from "react";
import { Links } from "@/components/Links";
import { Discog } from "@/components/Discog";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export type StateProps = {
  screenSetter: Dispatch<SetStateAction<Screen>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

export enum Screen {
  Home,
  Discog,
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(Screen.Home);

  const [currentSelection, setCurrentSelection] = useState(0);

  const stateProps: StateProps = {
    screenSetter: setCurrentScreen,
    selectionSetter: setCurrentSelection,
    selected: currentSelection,
  };

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <ThreeScene currentScreen={currentScreen} />

          {currentScreen == Screen.Home && <Links {...stateProps} />}
          {currentScreen == Screen.Discog && <Discog {...stateProps} />}
        </div>
      </QueryClientProvider>
    </main>
  );
}
