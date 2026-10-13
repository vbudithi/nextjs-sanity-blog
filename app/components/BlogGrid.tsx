
"use client";

import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { simpleBlogCard } from "@/lib/interface";

function BlogCardSkeleton() {
  return (
    <div className="w-full max-w-[350px] animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="h-44 bg-gray-200 dark:bg-gray-800" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-5 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export default function BlogGrid({
  posts: initialPosts,
  initialHasMore,
  tag,
}: {
  posts: simpleBlogCard[];
  initialHasMore: boolean;
  tag?: string;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        start: String(posts.length),
      });

      if (tag) {
        params.set("tag", tag);
      }

      const response = await fetch(`/api/blogs?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to load more articles.");
      }

      const result: {
        posts: simpleBlogCard[];
        hasMore: boolean;
      } = await response.json();

      setPosts((current) => {
        const existingIds = new Set(
          current.map((post) => post._id)
        );

        return [
          ...current,
          ...result.posts.filter(
            (post) => !existingIds.has(post._id)
          ),
        ];
      });

      setHasMore(result.hasMore);
    } catch (err) {
      console.error("Error loading more articles:", err);
      setError("Unable to load more articles. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [posts.length, tag, loading, hasMore]);

  useEffect(() => {
    const element = sentinelRef.current;

    if (!element || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  return (
    <>
      <div className="grid grid-cols-1 gap-15 place-items-center sm:place-items-start md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        ))}

        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {error && (
        <div className="py-6 text-center">
          <p className="mb-3 text-sm text-red-500">{error}</p>
          <button
            onClick={() => void loadMore()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      )}

      {hasMore && (
        <div
          ref={sentinelRef}
          className="h-10"
          aria-hidden="true"
        />
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          You&apos;ve reached the end of the articles.
        </p>
      )}
    </>
  );
}
