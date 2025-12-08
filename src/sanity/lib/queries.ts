import { defineQuery } from "next-sanity";

export const RELEASES_QUERY = defineQuery(
  '*[_type == "release" && active == true]',
);

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]`);
