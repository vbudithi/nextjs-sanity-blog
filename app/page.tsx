
import { sanityClient } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import { BLOG_QUERY } from "@/lib/queries";
import TagFilter from "./components/TagFilter";
import BlogGrid from "./components/BlogGrid";
import OpenSourceProjectGrid from "./components/OpenSourceProjectGrid";
import { Github, Newspaper } from "lucide-react";

async function getBlogs(): Promise<simpleBlogCard[]> {
  return await sanityClient.fetch(BLOG_QUERY);
}

const MAIN_TAGS = [
  "open source ai",
  "ai experiments",
  "ai security",
  "rag",
  "ai agents",
  "mcp",
  "multimodal",
  "local ai",
  "llm",
];

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const data = await getBlogs();

  const activeTag = params?.tag
    ? decodeURIComponent(params.tag).trim().toLowerCase()
    : undefined;

  // Keep navigation tags even when no blog uses them.
  const allTags = Array.from(
    new Set([
      ...MAIN_TAGS,
      ...data.flatMap(
        (post) =>
          post.tags?.map((tag: any) =>
            tag.title.trim().toLowerCase()
          ) || []
      ),
    ])
  );

  // Normalize hyphens and spaces for reliable matching.
  const normalizedTag = activeTag?.replace(/-/g, " ");

  const isOpenSourceTag =
    normalizedTag === "open source ai" ||
    normalizedTag === "open source projects";

  // Filter blog posts only for regular article tags.
  const filteredPosts = normalizedTag
    ? data.filter((post) =>
        post.tags?.some(
          (tag: any) =>
            tag.title.trim().toLowerCase() === normalizedTag
        )
      )
    : data;

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Permanent navigation tags */}
      <TagFilter tags={allTags} />

      {/* Homepage: projects and latest articles */}
      {!activeTag ? (
        <>
          <section className="mt-12">
           <h2 className="mb-6 text-2xl font-bold">
  <span className="inline-flex items-center gap-2">
    <Github size={26} className="shrink-0" />
    <span>Open Source GitHub</span>
  </span>
</h2>

            <OpenSourceProjectGrid />
          </section>

          <section className="mt-12">
           <h2 className="mb-6 text-2xl font-bold">
  <span className="inline-flex items-center gap-2">
    <Newspaper size={26} className="shrink-0" />
    <span>Latest Articles</span>
  </span>
</h2>

            {data.length > 0 ? (
              <BlogGrid posts={data} />
            ) : (
              <p className="py-10 text-center text-gray-500">
                No articles published yet.
              </p>
            )}
          </section>
        </>
      ) : isOpenSourceTag ? (
        /* Open Source AI does not depend on blog posts */
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">
            Open Source GitHub
          </h2>

          <OpenSourceProjectGrid />
        </section>
      ) : filteredPosts.length > 0 ? (
        /* Other tags show matching blog articles */
        <BlogGrid posts={filteredPosts} />
      ) : (
        /* Selected tag exists, but has no articles */
        <p className="py-12 text-center text-gray-500">
          No articles found.
        </p>
      )}
    </div>
  );
}
