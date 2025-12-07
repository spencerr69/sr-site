import { Screen, StateProps } from "@/app/page";

import { client } from "@/sanity/lib/client";
import { RELEASES_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "react-query";
import { RELEASES_QUERYResult } from "@/sanity/types";

const BASE_LINK_URL = "https://link.spencerraymon.de/";

export const Discog: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  const { isLoading, error, data } = useQuery("releases", async () => {
    return client.fetch(RELEASES_QUERY);
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const releases = data as RELEASES_QUERYResult;

  const releasesLis = releases.map((release, i) => {
    const selectedClass = props.selected == i + 1 ? "selected-link" : "";

    return (
      <li key={release._id}>
        <a
          href={BASE_LINK_URL + release.slug?.current}
          onMouseOver={onMouseOverGetter(i + 1)}
          className={"cursor-pointer " + selectedClass}
        >
          {release.title}
        </a>
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
          {/*  back button  */}
          <a
            onMouseOver={onMouseOverGetter(0)}
            onClick={() => {
              props.screenSetter(Screen.Home);
              props.selectionSetter(0);
            }}
            className={
              (props.selected == 0 ? "selected-link " : " ") + "cursor-pointer"
            }
          >
            back
          </a>

          <ul>
            {/*   releases */}
            {releasesLis}
          </ul>
        </div>
      </div>
    </>
  );
};
