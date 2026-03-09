import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import BackButton from "@/app/components/BackButton";
import ExploreButton from "@/app/components/ExploreButton";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
    const query = `*[_type == "blog" && slug.current == "${slug}"][0]{
    title,
    content,
    titleImage,
    smallDescription
  }`;

    return await sanityClient.fetch(query);
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    return (
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-10 ">
            <div className="flex items-center justify-between mb-6">
                <div className="inline-block">
                    <BackButton />
                </div>
                <ExploreButton />
            </div>

            {/* Title */}
            <h1 className="text-4xl text-primary dark:text-gray-300 font-bold mb-6 ">{post?.title}</h1>

            {/* Image */}
            <Image
                src={
                    post.titleImage
                        ? urlFor(post.titleImage).url()
                        : "/default-image.jpg"
                }
                alt={post?.title || "Blog Image"}
                width={600}
                height={500}
                className="rounded-lg object-cover mb-8"
            />

            {/* Description */}
            <p className="text-lg text-primary dark:text-gray-300">
                {post?.smallDescription}
            </p>
        </div >
    );
}