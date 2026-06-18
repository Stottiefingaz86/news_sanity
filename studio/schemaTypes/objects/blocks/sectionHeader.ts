import { defineField, defineType } from 'sanity'

export const sectionHeaderType = defineType({
  name: 'sectionHeader',
  title: 'Section header',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', type: 'string', title: 'Kicker / eyebrow' }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2 }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Title size',
      options: {
        list: [
          { title: 'Display', value: 'display' },
          { title: 'Large', value: 'large' },
          { title: 'Medium', value: 'medium' },
        ],
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'align',
      type: 'string',
      title: 'Alignment',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: { title: 'title', kicker: 'kicker' },
    prepare({ title, kicker }) {
      return { title: title || 'Section header', subtitle: kicker }
    },
  },
})
