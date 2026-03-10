import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { simpleBlogCard } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }: { post: simpleBlogCard }) {
    const href = `/blog/${post?.currentSlug}`;

    return (
        <Link href={href} className="block h-full">
            <Card className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-gray-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:bg-gray-800 cursor-pointer">

                {/* Image */}
                <div className="relative">
                    <Image
                        src={urlFor(post.titleImage).url()}
                        alt={post.title || "Blog Image"}
                        width={500}
                        height={300}
                        className="object-cover w-full h-48"
                    />
                </div>
                <CardContent className="flex flex-col flex-1 p-5">

                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-slate-900 dark:text-slate-100">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {post.smallDescription}
                    </p>
                    <div className="mt-auto pt-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(post?.publishedAt)}
                        </p>
                    </div>

                </CardContent>
            </Card>
        </Link>
    );
}