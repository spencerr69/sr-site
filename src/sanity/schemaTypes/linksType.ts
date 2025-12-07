import LinkGrabber from "../components/LinkGrabber";

const linksType = {
  name: "links",
  title: "Links",
  description: "Override generated links",
  type: "object",
  fields: [
    {
      type: "url",
      name: "spotify",
      title: "Spotify",
      components: { input: LinkGrabber },
    },
    {
      type: "url",
      name: "appleMusic",
      title: "Apple Music",
      components: { input: LinkGrabber },
    },
    {
      type: "url",
      name: "tidal",
      title: "Tidal",
      components: { input: LinkGrabber },
    },
    {
      type: "url",
      name: "bandcamp",
      title: "Bandcamp" /*components: {input: LinkGrabber}*/,
    },
    {
      type: "url",
      name: "youtube",
      title: "YouTube" /*components: {input: LinkGrabber}*/,
    },
    {
      type: "url",
      name: "soundcloud",
      title: "Soundcloud" /*components: {input: LinkGrabber}*/,
    },
  ],
};

export default linksType;
