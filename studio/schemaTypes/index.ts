import { articleType } from './article'
import { authorType } from './author'
import { categoryType } from './category'
import { newsSettingsType } from './newsSettings'
import { articleBodyType } from './objects/articleBody'
import {
  dividerBlockType,
  faqBlockType,
  relatedArticlesType,
} from './objects/blocks/contentBlocks'
import { contentGridType } from './objects/blocks/contentGrid'
import { ctaBlockType } from './objects/blocks/ctaBlock'
import { gridItemType } from './objects/blocks/gridItem'
import { marqueeType } from './objects/blocks/marquee'
import { mediaImageType } from './objects/blocks/mediaImage'
import { pullQuoteType } from './objects/blocks/pullQuote'
import { proseBodyType } from './objects/blocks/proseBody'
import { sectionHeaderType } from './objects/blocks/sectionHeader'
import { standfirstType } from './objects/blocks/standfirst'
import { textHeadingType } from './objects/blocks/textHeading'
import { videoEmbedType } from './objects/blocks/videoEmbed'

export const schemaTypes = [
  newsSettingsType,
  gridItemType,
  contentGridType,
  sectionHeaderType,
  pullQuoteType,
  proseBodyType,
  standfirstType,
  textHeadingType,
  marqueeType,
  videoEmbedType,
  mediaImageType,
  ctaBlockType,
  dividerBlockType,
  relatedArticlesType,
  faqBlockType,
  articleBodyType,
  articleType,
  authorType,
  categoryType,
]
