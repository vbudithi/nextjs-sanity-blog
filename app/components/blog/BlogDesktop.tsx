import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import BackButton from "@/app/components/BackButton";
import ExploreButton from "@/app/components/ExploreButton";
import TagBadge from '../TagBadge';
import { formatDate } from '@/lib/formatDate';
import BlogReader from '../BlogReader';
import SummaryClient from "@/app/components/SummaryClient";
import ArticleChatbot from "@/app/components/ArticleChatbot";
import { portableTextComponents } from "@/lib/PortableTextComponents";
import CommentSection from "../commentSection";

export default function BlogDesktop({ post, plainText, readTime }: any) {

    return (
        <>
            <div className="max-w-5xl mx-auto -mt-15">
                <div className="flex items-center justify-between  ">
                    <div className="inline-block">
                        <BackButton />
                    </div>
                    <ExploreButton />
                </div>
                <div className="mb-8 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        🧪 Part of my journey building real AI systems from scratch.
                    </p>
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
                <div className="flex items-start justify-between gap-6 my-4">

                    {/* Left: Voice Reader */}
                    <div className="flex-1">
                        <BlogReader text={plainText} />
                        <p className="text-gray-400 text-sm mt-2">{readTime} min read</p>
                    </div>

                    {/* Right: AI Summary */}
                    <div >
                        <SummaryClient articleContent={plainText} />
                        <div className="mt-12">
                            <ArticleChatbot article={plainText} />
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-video mb-8 max-w-4xl items-center justify-center mx-auto">
                    <Image
                        src={
                            post?.titleImage
                                ? urlFor(post.titleImage).width(1000).height(675).url()
                                : "/default-image.jpg"
                        }
                        alt={post?.title || "Blog Image"}
                        fill
                        className="rounded-xl object-cover  object-top shadow-md"
                    />
                </div>

                {/* Description */}
                <p className="text-lg text-primary dark:text-gray-300">
                    {post?.smallDescription}
                </p>
                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    <PortableText
                        value={post?.content}
                        components={portableTextComponents}
                    />
                </div>

                {/* Comments */}
                <CommentSection
                    postId={post?._id}
                    comments={post?.comments}
                    createdAt={post?.createdAt}
                />
            </div>
        </>
    )
}
