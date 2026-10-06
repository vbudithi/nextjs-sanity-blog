import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { BLOG_BY_IDS_QUERY } from "@/lib/queries";

export async function POST(request: Request) {
    try {
        const { postIds } = await request.json();

        if (!postIds || postIds.length === 0) {
            return NextResponse.json([]);
        }

        const posts = await sanityClient.fetch(BLOG_BY_IDS_QUERY  , {
            postIds,
        });

        return NextResponse.json(posts);

    } catch (error) {
        console.error("Favourites API error:", error);

        return NextResponse.json(
            { error: "Failed to load favourites" },
            { status: 500 }
        );
    }
}