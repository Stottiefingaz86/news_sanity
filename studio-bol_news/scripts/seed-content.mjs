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
  catWorldCup: 'category-world-cup',
  catNfl: 'category-nfl',
  catNba: 'category-nba',
  catPolitelyRaw: 'category-politely-raw',
  newsSettings: 'newsSettings',
  articleFeatured: 'article-world-cup-rankings',
  articleNfl: 'article-nfl-division-odds',
  articleNba: 'article-nba-playoff-guide',
  articleSgp: 'article-sgp-features',
  articleClv: 'article-clv-explained',
  articlePodcast: 'article-march-madness-podcast',
  articlePolitelyRaw1: 'article-politely-raw-patrick-peterson',
  articlePolitelyRaw2: 'article-politely-raw-matt-lawrence',
  articlePolitelyRaw3: 'article-politely-raw-blanco-brown',
  articlePolitelyRaw4: 'article-politely-raw-kentucky-derby',
  articlePolitelyRaw5: 'article-politely-raw-ufc-freedom-250',
  articlePolitelyRaw6: 'article-politely-raw-knicks-championship',
}

const ref = (id, key = id) => ({_key: key, _type: 'reference', _ref: id})

const ARTICLE_IMAGES = {
  [IDS.articleFeatured]: {file: 'world-cup.jpg', alt: 'World Cup power rankings hero'},
  [IDS.articleNfl]: {file: 'nfl.jpg', alt: 'NFL division odds preview'},
  [IDS.articleNba]: {file: 'nba.jpg', alt: 'NBA playoff race betting guide'},
  [IDS.articleSgp]: {file: 'betting.jpg', alt: 'March Madness SGP features'},
  [IDS.articleClv]: {file: 'analytics.jpg', alt: 'Closing line value explained'},
  [IDS.articlePodcast]: {file: 'march-madness.jpg', alt: 'March Madness bracket podcast'},
  [IDS.articlePolitelyRaw1]: {file: 'nfl.jpg', alt: 'Politely RAW — Patrick Peterson on free agency'},
  [IDS.articlePolitelyRaw2]: {file: 'world-cup.jpg', alt: 'Politely RAW — Matt Lawrence on World Cup betting'},
  [IDS.articlePolitelyRaw3]: {file: 'nba.jpg', alt: 'Politely RAW — Blanco Brown and Antoine Walker'},
  [IDS.articlePolitelyRaw4]: {file: 'betting.jpg', alt: 'Politely RAW — Kentucky Derby 152 preview'},
  [IDS.articlePolitelyRaw5]: {file: 'analytics.jpg', alt: 'Politely RAW — UFC Freedom 250 recap'},
  [IDS.articlePolitelyRaw6]: {file: 'march-madness.jpg', alt: 'Politely RAW — Knicks championship and UFC drama'},
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

function hasMainImage(image) {
  return Boolean(image?.asset?._ref || image?.asset?._id)
}

async function fetchExistingMainImages(client, articleIds) {
  const docs = await client.fetch(
    `*[_type == "article" && _id in $ids]{ _id, mainImage }`,
    {ids: articleIds},
  )

  return Object.fromEntries(docs.map((doc) => [doc._id, doc.mainImage]))
}

async function uploadAllArticleImages(client, existingMainImages = {}) {
  const images = {}

  for (const [articleId, config] of Object.entries(ARTICLE_IMAGES)) {
    if (hasMainImage(existingMainImages[articleId])) {
      images[articleId] = existingMainImages[articleId]
      console.log(`Keeping existing mainImage for ${articleId}`)
      continue
    }

    images[articleId] = await uploadArticleImage(client, config)
    console.log(`Uploaded image for ${articleId}`)
  }

  return images
}

async function seed() {
  console.log('Seeding BetOnline News content…')
  console.log(
    'Note: existing article mainImage fields in Sanity are preserved. Upload images in Studio to keep them.',
  )

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
    {
      _id: IDS.catWorldCup,
      title: 'World Cup 2026',
      slug: 'world-cup',
      kind: 'editorial',
      description: 'Coverage, odds, and analysis for the 2026 World Cup.',
    },
    {_id: IDS.catNfl, title: 'NFL', slug: 'nfl', kind: 'league'},
    {_id: IDS.catNba, title: 'NBA', slug: 'nba', kind: 'league'},
    {
      _id: IDS.catPolitelyRaw,
      title: 'Politely RAW',
      slug: 'politely-raw',
      kind: 'editorial',
      description:
        'Watch Politely RAW with Pacman Jones — unfiltered sports talk, interviews, and league breakdowns.',
    },
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

  const articleIds = Object.values(IDS).filter((id) => id.startsWith('article-'))
  const existingMainImages = await fetchExistingMainImages(client, articleIds)
  const articleImages = await uploadAllArticleImages(client, existingMainImages)
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
      categories: [IDS.catWorldCup, IDS.catExpert],
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
    {
      _id: IDS.articlePolitelyRaw1,
      title:
        'Free Agency Frenzy, the Maxx Crosby Blockbuster, and Life After the League w/ Patrick Peterson',
      slug: 'free-agency-frenzy-the-max-crosby-blockbuster-and-life-after-the-league',
      excerpt:
        'Pacman Jones is joined by Super Agent Peter Schaffer, cornerback Patrick Peterson, and co-host Drew Butler to break down the 2026 NFL league year.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v76w60e-free-agency-frenzy-the-max-crosby-blockbuster-and-life-after-the-league.html',
      timestamps: [
        {_key: 'pr1-intro', time: '00:00:00', label: 'Intro: Welcome back to Politely Raw.'},
        {_key: 'pr1-fa', time: '00:00:23', label: 'NFL New Year: Free agency is officially here.'},
        {
          _key: 'pr1-crosby',
          time: '00:06:10',
          label: 'The Max Crosby Blockbuster: Breaking down the Raiders trade to the Ravens.',
        },
      ],
      body: bodies.podcast,
      publishedAtOffsetDays: 0,
    },
    {
      _id: IDS.articlePolitelyRaw2,
      title: 'World Cup Betting and USA Soccer Struggles with Matt Lawrence | Politely RAW',
      slug: 'world-cup-betting-and-usa-soccer-struggles-with-matt-lawrence',
      excerpt:
        'Matt Lawrence joins Politely RAW to talk World Cup betting angles, USA soccer struggles, and what to watch ahead of the tournament.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v7b0ega-world-cup-betting-and-usa-soccer-struggles-with-matt-lawrence-politely-raw.html',
      body: bodies.podcast,
      publishedAtOffsetDays: -7,
    },
    {
      _id: IDS.articlePolitelyRaw3,
      title:
        'Blanco Brown on Independent Music and Trailer Trap, Antoine Walker NBA Confessions | Politely RAW',
      slug: 'blanco-brown-independent-music-trailer-trap-antoine-walker-nba',
      excerpt:
        'Blanco Brown talks independent music and trailer trap life, plus Antoine Walker on NBA headlines and league drama.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v7a1yjq-blanco-brown-on-independent-music-and-trailer-trap-antoine-walker-nba-confe.html',
      body: bodies.podcast,
      publishedAtOffsetDays: -14,
    },
    {
      _id: IDS.articlePolitelyRaw4,
      title:
        'Kentucky Derby 152 Expert Preview, NIL Legal Battles, and the Check on Your Ticket | Politely RAW',
      slug: 'kentucky-derby-152-expert-preview-nil-legal-battles',
      excerpt:
        'A full Kentucky Derby 152 preview, NIL legal battles across college sports, and betting angles for the Run for the Roses.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v798e1i-kentucky-derby-152-expert-preview-nil-legal-battles-and-the-check-on-your-t.html',
      body: bodies.podcast,
      publishedAtOffsetDays: -21,
    },
    {
      _id: IDS.articlePolitelyRaw5,
      title:
        "UFC Freedom 250 Recap, Gaethje's War, O'Malley's Salute, and Pereira vs Gane | Politely RAW",
      slug: 'ufc-freedom-250-recap-gaethje-omalley-pereira-vs-gane',
      excerpt:
        "Breaking down UFC Freedom 250 — Gaethje vs Pimblett, O'Malley's White House moment, and the Pereira vs Gane main event.",
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v7be1ey-ufc-freedom-250-recap-gaethjes-war-omalleys-salute-and-pereira-vs-gane.html',
      body: bodies.podcast,
      publishedAtOffsetDays: -28,
    },
    {
      _id: IDS.articlePolitelyRaw6,
      title:
        'Knicks Win Championship, Jalen Brunson HOF Debate, and UFC White House Drama | Politely RAW',
      slug: 'knicks-win-championship-jalen-brunson-hof-debate-ufc-white-house-drama',
      excerpt:
        'The Knicks title run, Jalen Brunson Hall of Fame debate, and the latest UFC White House fallout with Pacman Jones.',
      layout: 'media',
      author: IDS.authorShane,
      categories: [IDS.catPolitelyRaw],
      heroMediaUrl:
        'https://rumble.com/v7bczza-knicks-win-championship-jalen-brunson-hof-debate-and-ufc-white-house-drama.html',
      body: bodies.podcast,
      publishedAtOffsetDays: -35,
    },
  ]

  const publishedAt = new Date().toISOString()

  for (const article of articles) {
    const {
      _id,
      author,
      categories: catIds,
      body,
      slug,
      publishedAtOffsetDays = 0,
      ...fields
    } = article

    const articlePublishedAt = new Date(publishedAt)
    articlePublishedAt.setDate(articlePublishedAt.getDate() + publishedAtOffsetDays)

    await client.createOrReplace({
      _id,
      _type: 'article',
      publishedAt: articlePublishedAt.toISOString(),
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
