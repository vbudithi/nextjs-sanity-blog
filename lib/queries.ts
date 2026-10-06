export const BLOG_QUERY = `
*[_type == "blog"] | order(publishedAt desc){
_id,
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage,
  content,
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

// Fetches blog posts saved by the currently logged-in user as favourites
export const BLOG_BY_IDS_QUERY = `
            *[
                _type == "blog" &&
                _id in $postIds
            ] | order(publishedAt desc) {
                _id,
                title,
                smallDescription,
                "currentSlug": slug.current,
                titleImage,
                content,
                publishedAt,
                "tags": tags[]->{
                    title,
                    slug
                }
            }
        `;
