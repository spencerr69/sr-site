"use client";

import ThreeScene from "@/components/ThreeScene";
import { Dispatch, SetStateAction, useState } from "react";
import { Links } from "@/components/Links";
import { Discog } from "@/components/Discog";

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
      <div className="container">
        <ThreeScene />

        <div className="leftArea m-15">
          <h1 className={"text-white font-mono font-bold text-3xl"}>
            spencer raymond
          </h1>
          {currentScreen == Screen.Home && <Links {...stateProps} />}
          {currentScreen == Screen.Discog && <Discog {...stateProps} />}
        </div>
      </div>
    </main>
  );
}
