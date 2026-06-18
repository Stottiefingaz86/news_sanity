import { defineArrayMember, defineField, defineType } from 'sanity'

const lifecycleStatuses = [
  { title: 'Keep', value: 'keep' },
  { title: 'Improve', value: 'improve' },
  { title: 'Redirect', value: 'redirect' },
  { title: 'Noindex', value: 'noindex' },
  { title: 'Archive', value: 'archive' },
  { title: 'Delete', value: 'delete' },
  { title: 'Migrate', value: 'migrate' },
] as const

const articleLayouts = [
  {
    title: 'Standard',
    value: 'standard',
    description: 'Editorial layout with hero, summary box, and optional table of contents.',
  },
  {
    title: 'Analysis / Picks',
    value: 'analysis',
    description: 'Betting analysis with odds blocks and table of contents sidebar.',
  },
  {
    title: 'Longform',
    value: 'longform',
    description: 'Clean long-read layout without sidebar navigation.',
  },
  {
    title: 'Media / Show',
    value: 'media',
    description: 'Podcast or video feature with hero media and show timestamps.',
  },
] as const

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout & style' },
    { name: 'seo', title: 'SEO' },
    { name: 'lifecycle', title: 'Lifecycle' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'layout',
      title: 'Page layout',
      type: 'string',
      group: 'layout',
      options: {
        list: articleLayouts.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary box',
      type: 'text',
      group: 'layout',
      rows: 4,
      description: 'Shown in the dark summary callout on standard and analysis layouts.',
    }),
    defineField({
      name: 'showTableOfContents',
      title: 'Show table of contents',
      type: 'boolean',
      group: 'layout',
      initialValue: true,
      hidden: ({ document }) =>
        document?.layout !== 'standard' && document?.layout !== 'analysis',
    }),
    defineField({
      name: 'heroMediaUrl',
      title: 'Hero media URL',
      type: 'url',
      group: 'layout',
      description: 'Watch URL for media/show layout (YouTube or Rumble). Used as the video embed on Politely RAW episodes.',
      hidden: ({ document }) => document?.layout !== 'media',
    }),
    defineField({
      name: 'timestamps',
      title: 'Show timestamps',
      type: 'array',
      group: 'layout',
      hidden: ({ document }) => document?.layout !== 'media',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'showTimestamp',
          fields: [
            defineField({ name: 'time', type: 'string', title: 'Time' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
          preview: {
            select: { time: 'time', label: 'label' },
            prepare({ time, label }) {
              return { title: `${time ?? ''} ${label ?? ''}`.trim() }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'articleBody',
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'canonicalOverride',
      title: 'Canonical override',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'indexation',
      title: 'Indexation setting',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Index', value: 'index' },
          { title: 'Noindex', value: 'noindex' },
        ],
      },
      initialValue: 'index',
    }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      group: 'lifecycle',
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'string',
      group: 'lifecycle',
    }),
    defineField({
      name: 'lifecycleStatus',
      title: 'Lifecycle status',
      type: 'string',
      group: 'lifecycle',
      options: { list: lifecycleStatuses.map(({ title, value }) => ({ title, value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review date',
      type: 'date',
      group: 'lifecycle',
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry date',
      type: 'date',
      group: 'lifecycle',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      layout: 'layout',
      media: 'mainImage',
    },
    prepare({ title, author, layout, media }) {
      const layoutLabel = articleLayouts.find((item) => item.value === layout)?.title
      return {
        title,
        subtitle: [layoutLabel, author ? `by ${author}` : undefined].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
