import { sanityClient, urlFor } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import BlogCard from "./components/BlogCard";


async function getDate() {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }
`;

  const data = await sanityClient.fetch(query);
  return data;

}
export default async function Home() {
  const data: simpleBlogCard[] = await getDate();
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6 ">
      {data.map((post, idx) => (
        <BlogCard key={idx} post={post} />
      ))}
    </div>
  );
}
