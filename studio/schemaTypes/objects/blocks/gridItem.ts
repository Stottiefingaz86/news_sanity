import { defineField, defineType } from 'sanity'

export const gridItemType = defineType({
  name: 'gridItem',
  title: 'Grid item',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'body', type: 'text', title: 'Body', rows: 3 }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({ name: 'href', type: 'url', title: 'Link URL' }),
    defineField({
      name: 'colSpan',
      type: 'number',
      title: 'Column span (bento)',
      description: 'How many columns this tile spans in bento layouts.',
      options: { list: [1, 2] },
      initialValue: 1,
    }),
    defineField({
      name: 'rowSpan',
      type: 'number',
      title: 'Row span (bento)',
      options: { list: [1, 2] },
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Grid item', media }
    },
  },
})
