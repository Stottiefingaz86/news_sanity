import { defineArrayMember, defineField, defineType } from 'sanity'

export const marqueeType = defineType({
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'speed',
      type: 'string',
      title: 'Speed',
      options: {
        list: [
          { title: 'Slow', value: 'slow' },
          { title: 'Medium', value: 'medium' },
          { title: 'Fast', value: 'fast' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'separator',
      type: 'string',
      title: 'Separator',
      initialValue: '·',
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const list = Array.isArray(items) ? items : []
      return {
        title: 'Marquee',
        subtitle: list.slice(0, 3).join(' · ') || 'No items',
      }
    },
  },
})
