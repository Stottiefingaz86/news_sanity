import { defineArrayMember, defineField, defineType } from 'sanity'

export const newsSettingsType = defineType({
  name: 'newsSettings',
  title: 'News Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'showSubNav',
      title: 'Show sub-navigation',
      description:
        'When enabled, displays the horizontal pill sub-nav below the header on the homepage and listing pages.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'subNavItems',
      title: 'Sub-nav items',
      description: 'Labels for each pill tab. Only used when sub-navigation is enabled.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: ({ parent }) => !parent?.showSubNav,
      validation: (rule) =>
        rule.custom((items, context) => {
          const parent = context.parent as { showSubNav?: boolean } | undefined
          if (!parent?.showSubNav) return true
          if (!items || items.length === 0) {
            return 'Add at least one sub-nav item when sub-navigation is enabled.'
          }
          return true
        }),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'News Settings' }
    },
  },
})
