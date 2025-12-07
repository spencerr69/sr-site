/* eslint-disable react-hooks/exhaustive-deps */
import * as React                            from "react";
import { Button, TextInput }                 from "@sanity/ui";
import { set, TextInputProps, useFormValue } from "sanity";

/**
 * @component
 * A custom input component for Sanity that allows the user to grab a link for a release based on its UPC using the linkgrabbr API..
 *
 * @param {TextInputProps} props - The props to pass to the component.
 * @returns A JSX element representing the component.
 */
export default function LinkGrabber(props: TextInputProps) {
  console.log(props);
  const { onChange, value, id } = props;
  const upc: string = useFormValue(["UPC"]) as string;

  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(value || "");
  }, []);

  const handleClick = async () => {
    const res = await fetch("https://api.spencerraymon.de/linkgrabbr", {
      method: "POST",
      body: `{"id":"${id}","upc":"${upc}"}`,
    });

    const fixRes = await res.json();
    const link = fixRes.link;

    onChange(set(link));
    setUrl(link);
  };

  return (
    <div style={{}}>
      <TextInput
        style={{ width: "100%" }}
        contentEditable="false"
        readOnly
        value={url}
      />
      <Button mode="ghost" text="Grab Link" style={{}} onClick={handleClick} />
    </div>
  );
}
