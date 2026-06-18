import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'bol-news',
  title: 'BetOnline News',
  projectId: '4wpr1c6o',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('News Settings')
              .id('newsSettings')
              .child(
                S.document().schemaType('newsSettings').documentId('newsSettings'),
              ),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'newsSettings',
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
