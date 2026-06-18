import { defineField, defineType } from 'sanity'

export const videoEmbedType = defineType({
  name: 'videoEmbed',
  title: 'Video embed',
  type: 'object',
  fields: [
    defineField({ name: 'url', type: 'url', title: 'Video URL' }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
    defineField({
      name: 'aspect',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: 'video' },
          { title: 'Square', value: 'square' },
        ],
      },
      initialValue: 'video',
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Width',
      options: {
        list: [
          { title: 'Column width', value: 'default' },
          { title: 'Narrow (centered)', value: 'narrow' },
          { title: 'Wide', value: 'wide' },
          { title: 'Full column', value: 'full' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }) {
      return { title: caption || 'Video embed', subtitle: url }
    },
  },
})
