import { sanityClient, urlFor } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import { Card } from "@/components/ui/card";
import Image from "next/image";


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
    <div className="grid grid-cols-1 lg:grid-cols-4 mt-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image src={urlFor(post.titleImage).url()} alt={post.titleImage} width={500} height={500} className="rounded-t-lg h-50 object-cover" />
        </Card>
      ))}
    </div>
  );
}
