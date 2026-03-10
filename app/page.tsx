import { sanityClient, urlFor } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import BlogCard from "./components/BlogCard";
import { BLOG_QUERY } from "@/lib/queries";


async function getBlogs() {
  return await sanityClient.fetch(BLOG_QUERY);
}
export default async function Home() {
  const data: simpleBlogCard[] = await getBlogs();
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl  mx-auto px-4 ">
      {data.map((post) => (
        <BlogCard key={post.currentSlug} post={post} />
      ))}
    </div>
  );
}
