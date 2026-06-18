import { defineField, defineType } from 'sanity'

export const mediaImageType = defineType({
  name: 'mediaImage',
  title: 'Image with caption',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External image URL',
      description: 'Optional fallback when no Sanity image is uploaded.',
    }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Width',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Narrow', value: 'narrow' },
          { title: 'Full width', value: 'wide' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'aspect',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
        ],
      },
      initialValue: 'landscape',
    }),
  ],
  preview: {
    select: { caption: 'caption', media: 'image' },
    prepare({ caption, media }) {
      return { title: caption || 'Image', media }
    },
  },
})
