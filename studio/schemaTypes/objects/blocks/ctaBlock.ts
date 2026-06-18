import { defineField, defineType } from 'sanity'

export const ctaBlockType = defineType({
  name: 'ctaBlock',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', type: 'string', title: 'Kicker' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'body', type: 'text', title: 'Body', rows: 3 }),
    defineField({ name: 'buttonLabel', type: 'string', title: 'Button label' }),
    defineField({ name: 'buttonHref', type: 'url', title: 'Button URL' }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          { title: 'Dark', value: 'primary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Brand accent', value: 'accent' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'title', variant: 'variant' },
    prepare({ title, variant }) {
      return { title: title || 'Call to action', subtitle: variant }
    },
  },
})
