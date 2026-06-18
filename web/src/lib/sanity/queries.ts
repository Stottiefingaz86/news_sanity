const publishedArticleFilter = `
  _type == "article"
  && defined(slug.current)
  && lifecycleStatus in ["keep", "improve", "migrate"]
  && (!defined(expiryDate) || expiryDate >= now())
`;

export const articleCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  layout,
  featured,
  mainImage {
    ...,
    asset->
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  categories[]->{
    title,
    "slug": slug.current,
    kind
  }
}`;

export const articleDetailProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  layout,
  featured,
  mainImage {
    ...,
    asset->
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  categories[]->{
    title,
    "slug": slug.current,
    kind
  },
  summary,
  showTableOfContents,
  heroMediaUrl,
  timestamps,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        "href": href
      }
    }
  },
  metaTitle,
  metaDescription,
  canonicalOverride,
  ogImage,
  indexation
}`;

export const newsSettingsQuery = `*[_type == "newsSettings" && _id == "newsSettings"][0]{
  showSubNav,
  subNavItems
}`;

export const homepageArticlesQuery = `{
  "featured": *[
    ${publishedArticleFilter}
    && featured == true
  ] | order(publishedAt desc)[0] ${articleCardProjection},
  "latest": *[
    ${publishedArticleFilter}
  ] | order(publishedAt desc)[0...24] ${articleCardProjection},
  "popular": *[
    ${publishedArticleFilter}
    && publishedAt >= dateTime(now()) - 60*60*24*30
  ] | order(publishedAt desc)[0...10] ${articleCardProjection}
}`;

export const articleBySlugQuery = `*[
  ${publishedArticleFilter}
  && slug.current == $slug
][0] ${articleDetailProjection}`;

export const articleSlugsQuery = `*[
  ${publishedArticleFilter}
].slug.current`;

export const categoryBySlugQuery = `*[
  _type == "category"
  && slug.current == $slug
][0]{
  title,
  "slug": slug.current,
  description,
  "articles": *[
    ${publishedArticleFilter}
    && references(^._id)
  ] | order(publishedAt desc) ${articleCardProjection}
}`;

export const categorySlugsQuery = `*[_type == "category" && defined(slug.current)].slug.current`;
