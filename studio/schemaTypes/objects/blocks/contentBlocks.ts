import { defineArrayMember, defineField, defineType } from 'sanity'

export const dividerBlockType = defineType({
  name: 'dividerBlock',
  title: 'Divider / spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Thick rule', value: 'thick' },
          { title: 'Dots', value: 'dots' },
          { title: 'Space only', value: 'space' },
        ],
      },
      initialValue: 'line',
    }),
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }) {
      return { title: 'Divider', subtitle: style }
    },
  },
})

export const relatedArticlesType = defineType({
  name: 'relatedArticles',
  title: 'Related articles',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Section title' }),
    defineField({
      name: 'articles',
      type: 'array',
      title: 'Links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'relatedLink',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'href', type: 'string', title: 'URL path' }),
            defineField({ name: 'category', type: 'string', title: 'Category label' }),
          ],
          preview: {
            select: { title: 'title', category: 'category' },
            prepare({ title, category }) {
              return { title, subtitle: category }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', articles: 'articles' },
    prepare({ title, articles }) {
      const count = Array.isArray(articles) ? articles.length : 0
      return { title: title || 'Related articles', subtitle: `${count} links` }
    },
  },
})

export const faqBlockType = defineType({
  name: 'faqBlock',
  title: 'FAQ accordion',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Section title' }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Questions',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Question' }),
            defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3 }),
          ],
          preview: {
            select: { question: 'question' },
            prepare({ question }) {
              return { title: question }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: title || 'FAQ', subtitle: `${count} items` }
    },
  },
})
