import {getCliClient} from 'sanity/cli'
import {randomUUID} from 'node:crypto'

const client = getCliClient({apiVersion: '2024-01-01'})

function makeKey(prefix = 'key') {
  return `${prefix}_${randomUUID().slice(0, 8)}`
}

function addMissingKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const keyed = item._key ? item : {...item, _key: makeKey(`item${index}`)}
        return addMissingKeys(keyed)
      }
      return item
    })
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  const next = {...value}
  for (const [key, child] of Object.entries(next)) {
    if (Array.isArray(child) || (child && typeof child === 'object')) {
      next[key] = addMissingKeys(child)
    }
  }

  return next
}

async function fixArticles() {
  const articles = await client.fetch(
    `*[_type == "article" && !(_id in path("drafts.**"))]{ _id, categories, timestamps, body }`,
  )

  let patched = 0

  for (const article of articles) {
    const categories = addMissingKeys(article.categories)
    const timestamps = article.timestamps ? addMissingKeys(article.timestamps) : undefined
    const body = article.body ? addMissingKeys(article.body) : undefined

    const patch = {}
    if (JSON.stringify(categories) !== JSON.stringify(article.categories)) {
      patch.categories = categories
    }
    if (timestamps && JSON.stringify(timestamps) !== JSON.stringify(article.timestamps)) {
      patch.timestamps = timestamps
    }
    if (body && JSON.stringify(body) !== JSON.stringify(article.body)) {
      patch.body = body
    }

    if (Object.keys(patch).length === 0) continue

    await client.patch(article._id).set(patch).commit()
    patched += 1
    console.log(`Patched ${article._id}`)
  }

  console.log(`Done. Patched ${patched} of ${articles.length} articles.`)
}

fixArticles().catch((error) => {
  console.error(error)
  process.exit(1)
})
