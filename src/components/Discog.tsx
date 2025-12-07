import { Screen, StateProps } from "@/app/page";

import { client } from "@/sanity/lib/client";
import { RELEASES_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { useQuery } from "react-query";
import { RELEASES_QUERYResult } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";

const BASE_LINK_URL = "https://link.spencerraymon.de/";

export const Discog: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  const { isLoading, error, data } = useQuery("releases", async () => {
    return client.fetch(RELEASES_QUERY);
  });

  let releasesZipped = [[<></>, <></>]];

  if (data) {
    const releases = data as RELEASES_QUERYResult;

    releasesZipped = releases.map((release, i) => {
      const selectedClass = props.selected == i + 1 ? "selected-link" : "";

      let releaseType = "";

      if (typeof release.trackCount == "number") {
        if (release.trackCount == 1) {
          releaseType = "single";
        } else if (release.trackCount < 7) {
          releaseType = "ep";
        } else {
          releaseType = "album";
        }
      }

      if (release.albumArt?.asset == null) return [<></>, <></>];

      const image = urlFor(release.albumArt).width(750).url();

      return [
        <li key={release._id} className={"mb-5"}>
          <div
            className={
              "release  bg-gray-900 p-2 border-dotted border-2  discog-card discog-link " +
              selectedClass
            }
          >
            <a
              href={BASE_LINK_URL + release.slug?.current}
              onMouseOver={onMouseOverGetter(i + 1)}
              className={" cursor-pointer discog-link "}
            >
              <h2 className={"font-bold text-xl"}>{release.title}</h2>
              <p>{release.releaseDate}</p>
              <p>{releaseType}</p>

              <p className={"align-bottom text-right text-gray-500"}>
                {release.stockNumber}
              </p>
            </a>
          </div>
        </li>,
        <>
          <div
            className={
              "relative aspect-square w-full max-h-256 content-end artwork p-3 border-dotted border-2" +
              " bg-gray-900" +
              " hidden" +
              " lg:block"
            }
          >
            <Image
              className={"h-full w-full p-3 object-contain"}
              src={image}
              alt={`Album artwork for ${release.title}`}
              fill
              loading={"lazy"}
              preload={false}
            />
          </div>
        </>,
      ];
    });
  }

  const releasesLis = releasesZipped.map((release) => {
    return release[0];
  });

  const imagesLis = releasesZipped.map((release) => {
    return release[1];
  });

  return (
    <div className={"flex flex-row content-end justify-between w-dvw h-screen"}>
      <div className="leftArea m-15 min-w-1/2 max-w-256 w-2/2 lg:w-3/5">
        <h1 className={"text-white font-mono font-bold text-3xl"}>
          spencer raymond
        </h1>
        <div className="text-white font-mono text-sm font-light">
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

          <ul className={"mt-10"}>
            {/*   releases */}
            {isLoading ? <p></p> : error ? <p>Error</p> : releasesLis}
          </ul>
        </div>
      </div>
      <div className="rightArea max-h-screen m-15 flex-1 hidden lg:block ">
        {isLoading ? (
          <p></p>
        ) : error ? (
          <p>Error</p>
        ) : (
          imagesLis[props.selected - 1]
        )}
      </div>
    </div>
  );
};
