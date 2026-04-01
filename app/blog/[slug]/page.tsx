
import { sanityClient } from "@/lib/sanity";
import { BLOG_BY_SLUG_QUERY } from "@/lib/queries";
import { calculateReadTime } from "@/lib/readTime";
import { extractPlainText } from "@/lib/extractText";
import BlogWrapper from "@/app/components/blog/BlogWrapper";

interface BlogPageProps {
    params: Promise<{
        slug: string
    }>;
}

async function getBlogPost(slug: string) {
    return await sanityClient.fetch(BLOG_BY_SLUG_QUERY, { slug });
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    const plainText = extractPlainText(post?.content);
    const readTime = calculateReadTime(plainText);

    return (
        <>
            <div>
                <BlogWrapper post={post} plainText={plainText} readTime={readTime} />
            </div>
        </>
    );
}