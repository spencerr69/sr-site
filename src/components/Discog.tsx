import { type DiscogProps, Screen } from "@/components/App";
import Image from "next/image";
import React from "react";

export const Discog: React.FC<DiscogProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => {
    props.selectionSetter(key);
  };

  const releases = props.discogResults;

  const releasesZipped = releases.map((release, i) => {
    const selectedClass = props.selected == i + 1 ? "selected-link" : "";

    let releaseType;

    if (release.track_count == 1) {
      releaseType = "single";
    } else if (release.track_count < 7) {
      releaseType = "ep";
    } else {
      releaseType = "album";
    }

    if (release.artwork === "") return [<></>, <></>];

    const image = release.artwork ?? "";

    return [
      <li key={release.upc} className={"mb-5"}>
        <div
          className={
            "release  bg-gray-900 p-2 border-dotted border-2  discog-card discog-link " +
            selectedClass
          }
        >
          <a
            href={release.self_url ?? ""}
            onMouseOver={onMouseOverGetter(i + 1)}
            className={" cursor-pointer discog-link "}
          >
            <h2 className={"font-bold text-xl"}>{release.title}</h2>
            <p>{release.release_date}</p>
            <p>{releaseType}</p>

            <p className={"align-bottom text-right text-gray-500"}>
              {release.upc}
            </p>
          </a>
        </div>
      </li>,
      <>
        <div
          className={
            " aspect-square max-h-128 artwork p-3 border-gray-500 border-dotted border-2" +
            " bg-gray-900" +
            " hidden" +
            " lg:block"
          }
        >
          <Image
            className={" p-3 object-fit h-full max-h-128"}
            src={image}
            alt={`Album artwork for ${release.title}`}
            width={750}
            height={750}
            // fill
            loading={"lazy"}
            preload={false}
          />
        </div>
      </>,
    ];
  });

  const releasesLis = releasesZipped.map((release) => {
    return release[0];
  });

  const imagesLis = releasesZipped.map((release) => {
    return release[1];
  });

  return (
    <div
      className={
        "flex flex-row content-end justify-between w-dvw max-h-screen overflow-hidden"
      }
    >
      <div className="leftArea m-15 min-w-1/2 max-w-xl w-2/2 lg:w-3/5 overflow-auto ">
        <h1 className={"text-white font-mono font-bold text-3xl"}>
          spencer raymond
        </h1>
        <div className="text-white font-mono text-sm font-light  ">
          {/*  back button  */}
          <a
            onMouseOver={onMouseOverGetter(0)}
            onClick={() => {
              props.screenSetter(Screen.Home);
              props.selectionSetter(0);
            }}
            className={
              (props.selected == 0 ? "selected-link " : " ") +
              "cursor-pointer social-link"
            }
          >
            back
          </a>
          {}

          <ul className={"mt-10 overflow-auto max-h-4xl "}>
            {/*   releases */}
            {releasesLis}
          </ul>
        </div>
      </div>
      <div className="rightArea m-15 hidden lg:block ">
        {imagesLis[props.selected - 1]}
      </div>
    </div>
  );
};
