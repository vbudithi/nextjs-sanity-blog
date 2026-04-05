import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/formatDate";
import TagBadge from "@/app/components/TagBadge";
import { Eye } from "lucide-react";
import { simpleBlogCard } from "@/lib/interface";
import { portableTextToPlainText } from "@/lib/portableTextToPlainText";

export default function BlogCard({ post, activeCard, setActiveCard }: { post: simpleBlogCard; activeCard: string | null; setActiveCard: (slug: string | null) => void }) {
    console.log("content:", portableTextToPlainText(post.content));
    const flipped = activeCard === post.currentSlug;

    const href = `/blog/${post?.currentSlug}`;

    return (
        <div className="w-[300px] h-[360px] perspective ">
            <div
                className={`relative w-full h-full transition-transform duration-500 
        [transform-style:preserve-3d] ${flipped ? "rotate-y-180" : ""}`}
            >
                {/* FRONT */}
                <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg bg-slate-50 dark:bg-gray-900">
                    <Link href={href} className="block h-full">
                        {/* Image */}
                        <div className="relative w-full h-40">
                            <Image
                                src={
                                    post?.titleImage
                                        ? urlFor(post.titleImage).width(600).height(400).url()
                                        : "/default-image.jpg"
                                }
                                alt={post.title}
                                fill
                                className="object-cover object-top"
                            />
                        </div>

                        <div className="p-5">
                            <h2 className="text-lg font-semibold line-clamp-1">
                                {post.title}
                            </h2>

                            <div className="flex gap-2 mt-3">
                                {post.tags?.slice(0, 2).map((tag) => (
                                    <TagBadge
                                        key={tag.slug.current}
                                        label={tag.title}
                                        href={`/tags/${tag.slug.current}`}
                                    />
                                ))}
                            </div>

                            <p className="text-sm mt-3 line-clamp-2 text-gray-600 dark:text-gray-300">
                                {post.smallDescription}
                            </p>
                            <p className="text-xs mt-4 text-gray-500">
                                {formatDate(post?.publishedAt)}
                            </p>
                        </div>
                    </Link>
                    <button
                        onClick={(e) => {

                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCard(post.currentSlug);
                        }}
                        className="absolute bottom-2 right-2 flex items-center gap-1 text-xs 
text-gray-500 cursor-pointer hover:text-gray-700 
dark:text-gray-300 transition-colors duration-200

bg-white/70 dark:bg-black/50 
backdrop-blur-md border border-black/10 dark:border-white/10 
px-2 py-1 rounded-full hover:scale-110 
hover:bg-white/90 dark:hover:bg-black/70">
                        <Eye className="w-3 h-3" />
                        <span>Quick View</span>

                    </button>
                </div>

                {/* BACK */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-lg bg-black text-white p-5 flex flex-col justify-between">

                    {/* BACK ICON */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCard(null);
                        }}


                        className="absolute top-3 right-3 z-10 bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-all duration-200"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-bold line-clamp-2">
                            {post.title}
                        </h3>

                        <div className="h-px bg-white/20" />

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Key Insights
                        </p>

                        <ul className="text-sm text-gray-300 space-y-2 max-h-35 overflow-hidden relative">
                            {portableTextToPlainText(post.content)
                                .split(".")
                                .slice(0, 3)
                                .map((sentence, i) => (
                                    <li key={i}>• {sentence.trim()}</li>
                                ))}
                            {/* Fade overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                        </ul>
                    </div>

                    <Link href={href}>
                        <button className="text-sm underline cursor-pointer self-end mt-4 hover:text-gray-300 transition-colors duration-200">
                            Read Full Article →
                        </button>
                    </Link>
                </div>

            </div >
        </div >
    );
}