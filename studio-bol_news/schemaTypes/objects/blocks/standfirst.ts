import { defineField, defineType } from 'sanity'

export const standfirstType = defineType({
  name: 'standfirst',
  title: 'Standfirst',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'text',
      title: 'Deck line',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { text: 'text' },
    prepare({ text }) {
      return {
        title: text?.slice(0, 80) ?? 'Standfirst',
        subtitle: 'Deck / summary line',
      }
    },
  },
})
