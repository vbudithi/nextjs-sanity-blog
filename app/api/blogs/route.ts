import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { BLOG_PAGINATED_QUERY } from "@/lib/queries";

const PAGE_SIZE = 6;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const start = Math.max(0, Number(searchParams.get("start") ?? 0));
    const tag = searchParams.get("tag")?.trim().toLowerCase() || null;

    if (!Number.isInteger(start)) {
      return NextResponse.json(
        { error: "Invalid pagination offset." },
        { status: 400 }
      );
    }

   const posts = await sanityClient.fetch(
  BLOG_PAGINATED_QUERY,
  {
    start,
    end: start + PAGE_SIZE + 1,
    tag: tag ?? "",
  } as Record<string, string | number>
);

    return NextResponse.json({
      posts: posts.slice(0, PAGE_SIZE),
      hasMore: posts.length > PAGE_SIZE,
    });
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);

    return NextResponse.json(
      { error: "Failed to load articles." },
      { status: 500 }
    );
  }
}