export const BLOG_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage,
  publishedAt,
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ] | order(createdAt desc)
   
}`