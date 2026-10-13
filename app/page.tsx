import { sanityClient } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import {
  BLOG_PAGINATED_QUERY,
  BLOG_TAGS_QUERY,
} from "@/lib/queries";
import TagFilter from "./components/TagFilter";
import BlogGrid from "./components/BlogGrid";
import OpenSourceProjectGrid from "./components/OpenSourceProjectGrid";
import { Github, Newspaper } from "lucide-react";

const PAGE_SIZE = 6;

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
function normalizeTag(tag: string | undefined): string | undefined {
  return tag?.trim().toLowerCase().replace(/-/g, " ");
}

async function fetchPaginatedBlogs(
  start: number,
  end: number,
  tag: string
): Promise<simpleBlogCard[]> {
  return sanityClient.fetch(
    BLOG_PAGINATED_QUERY,
    { start, end, tag } as Record<string, string | number>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const activeTag = normalizeTag(params?.tag);

  const isOpenSourceTag =
    activeTag === "open source ai" ||
    activeTag === "open source projects";

  const [initialBatch, tagData] = await Promise.all([
    fetchPaginatedBlogs(
      0,
      PAGE_SIZE + 1,
      activeTag && !isOpenSourceTag ? activeTag : ""
    ),
    sanityClient.fetch(BLOG_TAGS_QUERY),
  ]);

  const posts = initialBatch.slice(0, PAGE_SIZE);
  const hasMore = initialBatch.length > PAGE_SIZE;

const normalizedTagData: string[] = (
  tagData as { title: string }[]
)
  .map((item: { title: string }) => normalizeTag(item.title))
  .filter((value: string | undefined): value is string => Boolean(value));

const allTags: string[] = Array.from(
  new Set<string>([...MAIN_TAGS, ...normalizedTagData])
);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <TagFilter tags={allTags} />

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

            {posts.length > 0 ? (
              <BlogGrid
                key="latest"
                posts={posts}
                initialHasMore={hasMore}
              />
            ) : (
              <p className="py-10 text-center text-gray-500">
                No articles published yet.
              </p>
            )}
          </section>
        </>
      ) : isOpenSourceTag ? (
        <section className="mt-12">
         <h2 className="mb-6 w-full text-center text-2xl font-bold">
  <span className="inline-flex items-center justify-center gap-2">
    <Github size={26} className="shrink-0" />
    <span>Open Source GitHub</span>
  </span>
</h2>

          <OpenSourceProjectGrid />
        </section>
      ) : posts.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-center justify-center">
            {activeTag}
          </h2>

          <BlogGrid
            key={activeTag}
            posts={posts}
            initialHasMore={hasMore}
            tag={activeTag}
          />
        </section>
      ) : (
        <p className="py-12 text-center text-gray-500">
          No articles found for this tag.
        </p>
      )}
    </div>
  );
}