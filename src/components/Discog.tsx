import { Screen, StateProps } from "@/app/page";

export const Discog: React.FC<StateProps> = (props) => {
  const onMouseOverGetter = (key: number) => () => props.selectionSetter(key);

  //type Release = {
  //  active: boolean;
  //  title: string;
  //  releaseDate: string;
  //  link: string;
  //  UPC: string;
  //  slug: {
  //    current: string;
  //  };
  //  albumArt: {
  //    asset: {
  //      image: unknown;
  //      metadata: {
  //        palette: {
  //          muted: {
  //            background: string;
  //          };
  //        };
  //      };
  //    };
  //  };
  //};

  return (
    <>
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

        <ul>{/*   releases */}</ul>
      </div>
    </>
  );
};
