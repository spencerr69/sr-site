import { defineQuery } from "next-sanity";

export const RELEASES_QUERY = defineQuery(
  '*[_type == "release" && Active == true]',
);
