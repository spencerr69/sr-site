"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Links } from "@/components/Links";
import { Discog } from "@/components/Discog";
import { QueryClient, QueryClientProvider } from "react-query";
import FiberScene from "@/components/FiberScene";
import { RELEASES_QUERYResult } from "@/sanity/sanity.types";

const queryClient = new QueryClient();

export type StateProps = {
  screenSetter: Dispatch<SetStateAction<Screen>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

export type DiscogProps = {
  discogResults: RELEASES_QUERYResult;
  screenSetter: Dispatch<SetStateAction<Screen>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

export enum Screen {
  Home,
  Discog,
}

export default function App({
  discogResults,
}: {
  discogResults: RELEASES_QUERYResult;
}) {
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
          <FiberScene currentScreen={currentScreen} />

          {currentScreen == Screen.Home && <Links {...stateProps} />}
          {currentScreen == Screen.Discog && (
            <Discog {...stateProps} discogResults={discogResults} />
          )}
        </div>
      </QueryClientProvider>
    </main>
  );
}
