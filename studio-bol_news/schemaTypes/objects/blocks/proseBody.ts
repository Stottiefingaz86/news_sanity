import { defineField, defineType } from 'sanity'

export const proseBodyType = defineType({
  name: 'proseBody',
  title: 'Body text',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      type: 'string',
      title: 'Columns',
      options: {
        list: [
          { title: 'Single column', value: '1' },
          { title: 'Two columns', value: '2' },
          { title: 'Three columns', value: '3' },
        ],
      },
      initialValue: '1',
    }),
    defineField({
      name: 'dropCap',
      type: 'boolean',
      title: 'Drop cap on first paragraph',
      initialValue: false,
    }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      title: 'Paragraphs',
      of: [{ type: 'text', rows: 4 }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { paragraphs: 'paragraphs', columns: 'columns' },
    prepare({ paragraphs, columns }) {
      const first = paragraphs?.[0] ?? 'Body text'
      return {
        title: first.slice(0, 80),
        subtitle: `${columns ?? '1'} column body`,
      }
    },
  },
})
