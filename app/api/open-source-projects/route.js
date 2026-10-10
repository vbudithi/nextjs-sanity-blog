
import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { OPEN_SOURCE_PROJECTS_QUERY } from "@/lib/queries";

export async function GET() {
  try {
    const projects = await sanityClient.fetch(
      OPEN_SOURCE_PROJECTS_QUERY
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch open-source projects:", error);

    return NextResponse.json(
      { error: "Failed to fetch open-source projects" },
      { status: 500 }
    );
  }
}
