import { defineField, defineType } from 'sanity'

export const textHeadingType = defineType({
  name: 'textHeading',
  title: 'Section heading',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      type: 'string',
      title: 'Level',
      options: {
        list: [
          { title: 'Section (H2)', value: 'h2' },
          { title: 'Subsection (H3)', value: 'h3' },
        ],
      },
      initialValue: 'h2',
    }),
  ],
  preview: {
    select: { text: 'text', level: 'level' },
    prepare({ text, level }) {
      return {
        title: text ?? 'Section heading',
        subtitle: level === 'h3' ? 'Subsection' : 'Section',
      }
    },
  },
})
