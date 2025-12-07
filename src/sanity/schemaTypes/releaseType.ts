import { defineField, defineType } from 'sanity'

export const releaseType = defineType({
    name: 'release',
    title: 'Release',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            description: 'Title of the release',
            type: 'string',
        }),
        defineField({
            name: 'albumArt',
            description: 'Album artwork',
            type: 'image',
        }),
        defineField({
            name: 'link',
            description: 'Fanlink to this release',
            type: 'url',
        }),
        defineField({
            name: 'releaseDate',
            description: 'Date of release',
            type: 'date',
        }),
        defineField({
            name: 'UPC',
            description: 'UPC of this release',
            type: 'string',
        }),
        defineField({
            name: 'Active',
            description: 'Active status - inactive will be hidden on site',
            type: "boolean",
        }),
        defineField({
            name: 'links',
            description: 'Override generated links',
            type: 'links',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                slugify: (val) => {
                    return val
                        .toLowerCase()
                        .split(' ')
                        .map((word) => {
                            const firstLetter = word[0]
                            if (firstLetter.match(/[a-z]/)) {
                                return firstLetter
                            } else {
                                return word[1]
                            }
                        })
                        .join('')
                },
            },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'releaseDate',
            media: 'albumArt',
        },
    },
})
