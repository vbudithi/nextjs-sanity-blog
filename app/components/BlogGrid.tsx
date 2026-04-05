"use client";
import React from 'react'
import BlogCard from "./BlogCard";
import { simpleBlogCard } from "@/lib/interface";
export default function BlogGrid({ posts }: { posts: simpleBlogCard[] }) {
    const [activeCard, setActiveCard] = React.useState<string | null>(null);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:place-items-start place-items-center">
            {posts.map((post) => (
                <BlogCard
                    key={post.currentSlug}
                    post={post}
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                />
            ))}
        </div>
    )
}
