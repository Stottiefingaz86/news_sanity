import { defineArrayMember, defineField, defineType } from 'sanity'

export const articleBodyType = defineType({
  name: 'articleBody',
  title: 'Article body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'oddsList',
      title: 'Odds list',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Section title' }),
        defineField({
          name: 'entries',
          type: 'array',
          title: 'Entries',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'oddsEntry',
              fields: [
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'odds', type: 'string', title: 'Odds' }),
              ],
              preview: {
                select: { label: 'label', odds: 'odds' },
                prepare({ label, odds }) {
                  return { title: label, subtitle: odds }
                },
              },
            }),
          ],
        }),
      ],
      preview: {
        select: { title: 'title' },
        prepare({ title }) {
          return { title: title || 'Odds list', subtitle: 'Odds block' }
        },
      },
    }),
    defineArrayMember({ type: 'sectionHeader' }),
    defineArrayMember({ type: 'proseBody' }),
    defineArrayMember({ type: 'standfirst' }),
    defineArrayMember({ type: 'textHeading' }),
    defineArrayMember({ type: 'pullQuote' }),
    defineArrayMember({ type: 'contentGrid' }),
    defineArrayMember({ type: 'marquee' }),
    defineArrayMember({ type: 'videoEmbed' }),
    defineArrayMember({ type: 'mediaImage' }),
    defineArrayMember({ type: 'ctaBlock' }),
    defineArrayMember({ type: 'dividerBlock' }),
    defineArrayMember({ type: 'relatedArticles' }),
    defineArrayMember({ type: 'faqBlock' }),
  ],
})
