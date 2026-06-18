import {getCliClient} from 'sanity/cli'
import {readFileSync} from 'node:fs'
import {basename, dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildArticleBodies} from './article-bodies.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, 'seed-images')

const client = getCliClient({apiVersion: '2024-01-01'})

const IDS = {
  authorShane: 'author-shane-pratt',
  authorEditorial: 'author-editorial-team',
  catExpert: 'category-expert-analysis',
  catNews: 'category-news',
  catNfl: 'category-nfl',
  catNba: 'category-nba',
  newsSettings: 'newsSettings',
  articleFeatured: 'article-world-cup-rankings',
  articleNfl: 'article-nfl-division-odds',
  articleNba: 'article-nba-playoff-guide',
  articleSgp: 'article-sgp-features',
  articleClv: 'article-clv-explained',
  articlePodcast: 'article-march-madness-podcast',
}

const ref = (id, key = id) => ({_key: key, _type: 'reference', _ref: id})

const ARTICLE_IMAGES = {
  [IDS.articleFeatured]: {file: 'world-cup.jpg', alt: 'World Cup power rankings hero'},
  [IDS.articleNfl]: {file: 'nfl.jpg', alt: 'NFL division odds preview'},
  [IDS.articleNba]: {file: 'nba.jpg', alt: 'NBA playoff race betting guide'},
  [IDS.articleSgp]: {file: 'betting.jpg', alt: 'March Madness SGP features'},
  [IDS.articleClv]: {file: 'analytics.jpg', alt: 'Closing line value explained'},
  [IDS.articlePodcast]: {file: 'march-madness.jpg', alt: 'March Madness bracket podcast'},
}

async function uploadArticleImage(client, {file, alt}) {
  const filePath = join(IMAGES_DIR, file)
  const buffer = readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filePath),
  })

  return {
    _type: 'image',
    alt,
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function uploadAllArticleImages(client) {
  const images = {}

  for (const [articleId, config] of Object.entries(ARTICLE_IMAGES)) {
    images[articleId] = await uploadArticleImage(client, config)
    console.log(`Uploaded image for ${articleId}`)
  }

  return images
}

async function seed() {
  console.log('Seeding BetOnline News content…')

  await client.createOrReplace({
    _id: IDS.authorShane,
    _type: 'author',
    name: 'Shane Pratt',
    slug: {_type: 'slug', current: 'shane-pratt'},
  })

  await client.createOrReplace({
    _id: IDS.authorEditorial,
    _type: 'author',
    name: 'Editorial Team',
    slug: {_type: 'slug', current: 'editorial-team'},
  })

  const categories = [
    {_id: IDS.catExpert, title: 'Expert Analysis', slug: 'expert-analysis', kind: 'editorial'},
    {_id: IDS.catNews, title: 'News', slug: 'news', kind: 'editorial'},
    {_id: IDS.catNfl, title: 'NFL', slug: 'nfl', kind: 'league'},
    {_id: IDS.catNba, title: 'NBA', slug: 'nba', kind: 'league'},
  ]

  for (const category of categories) {
    await client.createOrReplace({
      _type: 'category',
      ...category,
      slug: {_type: 'slug', current: category.slug},
    })
  }

  await client.createOrReplace({
    _id: IDS.newsSettings,
    _type: 'newsSettings',
    showSubNav: false,
    subNavItems: ['Latest', 'Expert Analysis', 'NFL', 'NBA'],
  })

  const articleImages = await uploadAllArticleImages(client)
  const bodies = buildArticleBodies({
    worldCup: articleImages[IDS.articleFeatured],
    nfl: articleImages[IDS.articleNfl],
    nba: articleImages[IDS.articleNba],
    betting: articleImages[IDS.articleSgp],
    analytics: articleImages[IDS.articleClv],
    marchMadness: articleImages[IDS.articlePodcast],
  })

  const articles = [
    {
      _id: IDS.articleFeatured,
      title: 'Ranking 10 Teams with Best Chance to Win the World Cup',
      slug: 'ranking-10-teams-best-chance-win-world-cup',
      excerpt:
        'Brazil and France lead our power rankings, but the 48-team format creates value on dark horses.',
      summary:
        'Brazil and France lead our power rankings, but the 48-team format creates value on dark horses.',
      layout: 'standard',
      featured: true,
      author: IDS.authorShane,
      categories: [IDS.catExpert],
      body: bodies.worldCup,
    },
    {
      _id: IDS.articleNfl,
      title: 'NFL Division Odds: Early Look at AFC & NFC Value',
      slug: 'nfl-division-odds-early-look',
      excerpt: 'Division futures are already moving — here are the numbers worth tracking.',
      layout: 'standard',
      author: IDS.authorEditorial,
      categories: [IDS.catNfl],
      body: bodies.nfl,
    },
    {
      _id: IDS.articleNba,
      title: 'NBA Playoff Race: Betting Guide for the Stretch Run',
      slug: 'nba-playoff-race-betting-guide',
      excerpt: 'Conference winner odds, seeding scenarios, and late-season angles.',
      layout: 'analysis',
      author: IDS.authorShane,
      categories: [IDS.catNba],
      body: bodies.nba,
    },
    {
      _id: IDS.articleSgp,
      title: 'BetOnline Launches New SGP+ Features for March Madness',
      slug: 'betonline-launches-new-sgp-features',
      excerpt: 'Same-game parlay builder updates ahead of the tournament.',
      layout: 'standard',
      author: IDS.authorEditorial,
      categories: [IDS.catNews],
      body: bodies.sgp,
    },
    {
      _id: IDS.articleClv,
      title: 'Closing Line Value Explained for New Bettors',
      slug: 'closing-line-value-explained',
      excerpt: 'Why beating the closing line is the benchmark sharp bettors use.',
      summary: 'Why beating the closing line is the benchmark sharp bettors use.',
      layout: 'standard',
      author: IDS.authorEditorial,
      categories: [IDS.catExpert],
      body: bodies.clv,
    },
    {
      _id: IDS.articlePodcast,
      title: 'March Madness Bracket Breakdown — Weekly Podcast',
      slug: 'march-madness-bracket-breakdown-podcast',
      excerpt: 'Upset picks, region breakdowns, and SGP ideas for the opening weekend.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catNews],
      heroMediaUrl: 'https://www.youtube.com/watch?v=Ew-3-8itpnc',
      timestamps: [
        {_key: 'ts-intro', time: '0:00', label: 'Intro & bracket overview'},
        {_key: 'ts-east', time: '4:30', label: 'East region upset picks'},
        {_key: 'ts-sgp', time: '12:15', label: 'SGP ideas for opening weekend'},
      ],
      body: bodies.podcast,
    },
  ]

  const publishedAt = new Date().toISOString()

  for (const article of articles) {
    const {_id, author, categories: catIds, body, slug, ...fields} = article

    await client.createOrReplace({
      _id,
      _type: 'article',
      publishedAt,
      lifecycleStatus: 'keep',
      indexation: 'index',
      showTableOfContents: true,
      author: ref(author),
      categories: catIds.map((id) => ref(id, `cat-${id}`)),
      slug: {_type: 'slug', current: slug},
      mainImage: articleImages[_id],
      body,
      ...fields,
    })
  }

  console.log(`Seeded ${articles.length} articles, ${categories.length} categories, 2 authors, news settings.`)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
