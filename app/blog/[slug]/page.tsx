import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import BackButton from "@/app/components/BackButton";
import ExploreButton from "@/app/components/ExploreButton";
import { PortableText } from "next-sanity";
import { formatDate } from "@/lib/formatDate";
import CommentSection from "@/app/components/commentSection";
import { BLOG_BY_SLUG_QUERY } from "@/lib/queries";
import TagBadge from "@/app/components/TagBadge";

interface BlogPageProps {
    params: Promise<{
        slug: string
    }>;
}

async function getBlogPost(slug: string) {
    return await sanityClient.fetch(BLOG_BY_SLUG_QUERY, { slug });
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
            <div className="flex items-center justify-between mb-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post?.tags?.map((tag: any, i: number) => (
                        <TagBadge
                            key={tag.slug.current}
                            label={tag.title}
                        />
                    ))}
                </div>

                {/* Date */}
                <p className="text-sm text-gray-400">
                    {formatDate(post?.publishedAt)}
                </p>

            </div>

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