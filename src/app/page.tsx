"use client";

import ThreeScene from "@/components/ThreeScene";
import { Dispatch, SetStateAction, useState } from "react";

type StateProps = {
  screenSetter: Dispatch<SetStateAction<Screen>>;
  selectionSetter: Dispatch<SetStateAction<number>>;
  selected: number;
};

const Links: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  type Link = {
    name: string;
    url: string;
  };

  const links: Link[] = [
    { name: "discography", url: "" },
    { name: "spotify", url: "" },
    { name: "apple music", url: "" },
    { name: "bandcamp", url: "" },
    { name: "soundcloud", url: "" },
    { name: "twitter", url: "" },
    { name: "instagram", url: "" },
    { name: "youtube", url: "" },
  ];

  const liItems = links.map((link, i) => {
    const selectedClass = props.selected === i ? "selected-link" : "";

    return (
      <li key={i}>
        <a
          onClick={i == 0 ? () => props.screenSetter(Screen.Discog) : () => {}}
          onMouseOver={onMouseOverGetter(i)}
          href={link.url ? link.url : "#"}
          className={"cursor-pointer " + selectedClass}
        >
          {link.name}
        </a>
      </li>
    );
  });

  return (
    <>
      <div className="text-white font-mono text-sm font-light">
        <ul>{liItems}</ul>
      </div>
    </>
  );
};

const discog = (
  screenSetter: Dispatch<SetStateAction<Screen>>,
  selectionSetter: Dispatch<SetStateAction<number>>,
  selected: number,
) => (
  <>
    <div className="text-white font-mono text-sm font-light">
      <a onClick={() => screenSetter(Screen.Home)} className={"cursor-pointer"}>
        back
      </a>
    </div>
  </>
);

enum Screen {
  Home,
  Discog,
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(Screen.Home);

  const [currentSelection, setCurrentSelection] = useState(0);

  return (
    <main>
      <div className="container">
        <ThreeScene />

        <div className="leftArea m-15">
          <h1 className={"text-white font-mono font-bold text-3xl"}>
            spencer raymond
          </h1>
          {currentScreen == Screen.Home && (
            <Links
              screenSetter={setCurrentScreen}
              selectionSetter={setCurrentSelection}
              selected={currentSelection}
            />
          )}
          {currentScreen == Screen.Discog &&
            discog(setCurrentScreen, setCurrentSelection, currentSelection)}
        </div>
      </div>
    </main>
  );
}
