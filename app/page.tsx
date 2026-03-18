import { sanityClient } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import BlogCard from "./components/BlogCard";
import { BLOG_QUERY } from "@/lib/queries";
import TagFilter from "./components/TagFilter";
async function getBlogs() {
  return await sanityClient.fetch(BLOG_QUERY);
}

export default async function Home({ searchParams, }: {
  searchParams?: Promise<{ tag?: string }>;
}) {

  console.log("SEARCH PARAMS RECEIVED:", searchParams);
  const params = await searchParams;

  const data: simpleBlogCard[] = await getBlogs();

  const activeTag = params?.tag
    ? decodeURIComponent(params.tag)
    : undefined;
  console.log("ACTIVE TAG FROM URL:", activeTag);


  // Collect all unique tags for the filter bar
  const allTags = Array.from(
    new Set(
      data.flatMap((post) => post.tags?.map((t: any) => t.title.toLowerCase()) || [])
    )
  );


  // Filter posts by tag
  const filteredPosts = activeTag
    ? data.filter((post) =>
      post.tags?.some((t: any) => t.title.trim().toLowerCase() === activeTag?.trim().toLowerCase())
    )
    : data;


  console.log("FILTERED POSTS:", filteredPosts.map(p => p.title));


  console.log(
    "ALL POST TAGS:",
    data.map((post) => ({
      title: post.title,
      tags: post.tags?.map((t: any) => t.title)
    }))
  );

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* TAG FILTER */}
      <TagFilter tags={allTags} />

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {filteredPosts.map((post) => (
          <BlogCard key={post.currentSlug} post={post} />
        ))}
      </div>
    </div>
  );
}