"use client";

import TagBadge from "@/app/components/TagBadge";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function TagFilter({ tags }: { tags: string[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeTag = searchParams.get("tag");

    const handleClick = (tag: string) => {
        if (tag === activeTag) {
            router.push("/");
        } else {
            router.push(`/?tag=${encodeURIComponent(tag)}`);
        }
    };

    return (
        <div className="flex gap-5 mb-6 flex-wrap justify-center">

            {tags?.map((tag) => {
                const isActive = activeTag === tag;

                return (
                    <button
                        key={tag}
                        onClick={() => handleClick(tag)}
                        className="focus:outline-none"
                    >
                        <TagBadge
                            label={tag}
                            variant="filter"
                            rightIcon={isActive ? <XCircle className="w-3 h-3" /> : undefined}
                            className={
                                isActive
                                    ? "bg-gray-800 text-white ring-2 ring-gray-400 scale-105 cursor-pointer"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 cursor-pointer"
                            }
                        />
                    </button>
                );
            })}
        </div>
    );
}