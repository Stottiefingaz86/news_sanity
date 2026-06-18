import { defineField, defineType } from 'sanity'

export const pullQuoteType = defineType({
  name: 'pullQuote',
  title: 'Pull quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'attribution', type: 'string', title: 'Attribution' }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          { title: 'Highlight', value: 'highlight' },
          { title: 'Boxed', value: 'boxed' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'highlight',
    }),
  ],
  preview: {
    select: { quote: 'quote', attribution: 'attribution' },
    prepare({ quote, attribution }) {
      return {
        title: quote ? `"${quote.slice(0, 60)}${quote.length > 60 ? '…' : ''}"` : 'Pull quote',
        subtitle: attribution,
      }
    },
  },
})
