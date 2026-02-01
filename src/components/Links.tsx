import { Screen, StateProps } from "@/components/App";
import React from "react";
import NextLink from "next/link";
import { Link } from "@/lib/definitions";

export const Links: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  const links: Link[] = [
    { name: "discography", url: "" },
    { name: "press kit", url: "/presskit" },
    ...props.artistResults.links
      .map((link) => {
        return { ...link, name: link.name.toLowerCase() };
      })
      .filter(({ name }) => name !== "website"),
  ];

  const liItems = links.map((link, i) => {
    const selectedClass = props.selected === i ? "selected-link" : "";

    return (
      <li key={i}>
        <NextLink
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
        </NextLink>
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
