import linksType        from "./linksType";
import { releaseType }  from "./releaseType";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [releaseType, siteSettings, linksType];

export const schema = {
  types: schemaTypes,
};
