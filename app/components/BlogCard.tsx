import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { simpleBlogCard } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import TagBadge from "@/app/components/TagBadge";

export default function BlogCard({ post }: { post: simpleBlogCard }) {
    const href = `/blog/${post?.currentSlug}`;

    return (
        <Link href={href} className="block h-full">
            <Card className="flex flex-col overflow-hidden bg-slate-50 dark:bg-gray-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:bg-gray-800">

                {/* Image */}
                <div className="relative w-full h-40">
                    <Image
                        src={urlFor(post.titleImage).width(600).height(400).url()}
                        alt={post.title || "Blog Image"}
                        fill
                        className="object-cover"
                    />
                </div>

                <CardContent className="flex flex-col flex-1 p-5">

                    {/* Title */}
                    <h2 className="text-xl font-semibold line-clamp-1  text-slate-900 dark:text-slate-100">
                        {post.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2 mt-4">
                        {post.tags?.slice(0, 2).map((tag: any, i: number) => (
                            <TagBadge key={tag.slug.current} label={tag.title} />
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-3 min-h-10">
                        {post.smallDescription}
                    </p>

                    {/* Date */}
                    <div className="mt-auto">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(post?.publishedAt)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}