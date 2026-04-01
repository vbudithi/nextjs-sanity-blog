import BackButton from "@/app/components/BackButton";
import { formatDate } from "@/lib/formatDate";
import ExploreButton from "@/app/components/ExploreButton";
import BlogReader from "../BlogReader";
import SummaryClient from "../SummaryClient";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "next-sanity";
import CommentSection from "../commentSection";
import { PortableTextComponentsMobile } from "@/lib/PortableTextComponentsMobile";

export default function BlogMobile({ post, plainText, readTime }: any) {
    return (
        <div className="px-4 -mt-16">
            <div className="flex items-center justify-between  ">
                <div className="inline-block">
                    <BackButton />
                </div>
                <ExploreButton />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold leading-tight mb-2">
                {post.title}
            </h1>

            {/* Date */}
            <p className="text-xs text-gray-400 mb-4">
                {formatDate(post.publishedAt)}
            </p>

            <div className="flex items-start justify-between gap-6 my-4">

                {/* Voice Reader */}
                <BlogReader text={plainText} />

                {/* AI Summary */}
                <div className="-mt-4">
                    <SummaryClient articleContent={plainText} />
                </div>

            </div>
            {/* Read time */}
            <p className="text-gray-400 text-sm -mt-8">{readTime} min read</p>

            {/* Image */}
            <div className="relative w-full aspect-video mb-8 max-w-4xl items-center justify-center mx-auto mt-4">
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
            <PortableText
                value={post?.content}
                components={PortableTextComponentsMobile}
            />

            {/* Comments */}
            <CommentSection
                postId={post?._id}
                comments={post?.comments}
                createdAt={post?.createdAt}
            />
        </div>
    );
}