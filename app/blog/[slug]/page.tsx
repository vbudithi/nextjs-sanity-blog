import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import BackButton from "@/app/components/BackButton";
import ExploreButton from "@/app/components/ExploreButton";
import { PortableText } from "next-sanity";
import { formatDate } from "@/lib/formatDate";
import CommentSection from "@/app/components/commentSection";

interface BlogPageProps {
    params: Promise<{
        slug: string
    }>;
}

async function getBlogPost(slug: string) {
    const query = `*[_type == "blog" && slug.current == "${slug}"][0]{
    title,
    content,
    titleImage,
    publishedAt,
    smallDescription,
    "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{
      _id,
      name,
      comment,
      createdAt
    }
  }`;

    return await sanityClient.fetch(query);
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    return (
        <div className="max-w-3xl mx-auto -mt-15">
            <div className="flex items-center justify-between  ">
                <div className="inline-block">
                    <BackButton />
                </div>
                <ExploreButton />
            </div>

            {/* Title */}
            <h1 className="text-4xl text-primary dark:text-gray-300 font-bold mb-6 ">{post?.title}</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {formatDate(post?.publishedAt)}
            </p>

            {/* Image */}
            <div className="relative w-full aspect-video mb-8">
                <Image
                    src={
                        post?.titleImage
                            ? urlFor(post.titleImage).width(1200).height(675).url()
                            : "/default-image.jpg"
                    }
                    alt={post?.title || "Blog Image"}
                    fill
                    className="rounded-xl object-cover shadow-md"
                />
            </div>

            {/* Description */}
            <p className="text-lg text-primary dark:text-gray-300">
                {post?.smallDescription}
            </p>
            {/* content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={post?.content} />

            </div>
            <CommentSection
                postId={post?._id}
                comments={post?.comments}
                createdAt={post?.createdAt}
            />
        </div >
    );
}