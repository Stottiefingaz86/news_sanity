import { defineArrayMember, defineField, defineType } from 'sanity'

export const contentGridType = defineType({
  name: 'contentGrid',
  title: 'Content grid',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout style',
      options: {
        list: [
          { title: 'Uniform grid', value: 'uniform' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Bento', value: 'bento' },
        ],
        layout: 'radio',
      },
      initialValue: 'uniform',
    }),
    defineField({
      name: 'columns',
      type: 'number',
      title: 'Columns',
      description: 'Number of columns on desktop.',
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: 'gap',
      type: 'string',
      title: 'Gap',
      options: {
        list: [
          { title: 'Tight', value: 'tight' },
          { title: 'Normal', value: 'normal' },
          { title: 'Loose', value: 'loose' },
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Grid items',
      of: [defineArrayMember({ type: 'gridItem' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { layout: 'layout', columns: 'columns', items: 'items' },
    prepare({ layout, columns, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: `${layout ?? 'grid'} · ${columns ?? 3} cols`,
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
