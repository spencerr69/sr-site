import { defineField, defineType } from "sanity";

export const releaseType = defineType({
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    defineField({
      name: "title",
      description: "Title of the release",
      type: "string",
    }),
    defineField({
      name: "albumArt",
      description: "Album artwork",
      type: "image",
    }),
    defineField({
      name: "releaseDate",
      description: "Date of release",
      type: "date",
    }),
    defineField({
      name: "upc",
      description: "UPC of this release",
      type: "string",
      title: "UPC",
    }),
    defineField({
      name: "active",
      description: "Active status - inactive will be hidden on site",
      type: "boolean",
    }),
    defineField({
      name: "links",
      description: "Override generated links",
      type: "links",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (val) => {
          return val
            .toLowerCase()
            .split(" ")
            .map((word) => {
              const firstLetter = word[0];
              if (firstLetter.match(/[a-z]/)) {
                return firstLetter;
              } else {
                return word[1];
              }
            })
            .join("");
        },
      },
    }),
    defineField({
      name: "trackCount",
      type: "number",
      description: "Number of tracks in this release",
    }),
    defineField({
      name: "stockNumber",
      type: "string",
      description: "Stock number of this release",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "releaseDate",
      media: "albumArt",
    },
  },
});
