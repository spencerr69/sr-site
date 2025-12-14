import { Screen, StateProps } from "@/components/App";
import React from "react";
import Link from "next/link";

export const Links: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  type Link = {
    name: string;
    url: string;
  };

  const links: Link[] = [
    { name: "discography", url: "" },
    { name: "press kit", url: "/presskit" },

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
        <Link
          onClick={
            i == 0
              ? () => {
                  props.screenSetter(Screen.Discog);
                  props.selectionSetter(0);
                }
              : () => {}
          }
          onMouseOver={onMouseOverGetter(i)}
          href={link.url || "#"}
          className={"social-link cursor-pointer " + selectedClass}
        >
          {link.name}
        </Link>
      </li>
    );
  });

  return (
    <>
      <div className="leftArea m-15">
        <h1 className={"text-white font-mono font-bold text-3xl"}>
          spencer raymond
        </h1>
        <div className="text-white font-mono text-sm font-light">
          <ul>{liItems}</ul>
        </div>
      </div>
    </>
  );
};
