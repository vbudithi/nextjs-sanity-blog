export const BLOG_QUERY = `
*[_type == "blog"] | order(publishedAt desc){
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage,
  publishedAt,
  "tags": tags[]->{
    title,
    slug
  }
}
`;


export const BLOG_BY_SLUG_QUERY = `
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  content,
  titleImage,
  publishedAt,
  smallDescription,
  "tags": tags[]->{
    title,
    slug
  },
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ] | order(createdAt desc) {
    _id,
    name,
    comment,
    createdAt
  }
}
`;