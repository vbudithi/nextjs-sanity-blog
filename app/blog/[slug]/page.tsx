import { sanityClient, urlFor } from "@/lib/sanity";
import { BLOG_BY_SLUG_QUERY } from "@/lib/queries";
import { calculateReadTime } from "@/lib/readTime";
import { extractPlainText } from "@/lib/extractText";
import BlogWrapper from "@/app/components/blog/BlogWrapper";

interface BlogPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getBlogPost(slug: string) {
    return await sanityClient.fetch(BLOG_BY_SLUG_QUERY, { slug });
}
export async function generateMetadata({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    const ogImage = post?.titleImage
        ? urlFor(post.titleImage).width(1200).height(630).url()
        : "https://vivbyte.vercel.app/default-og.jpg";

    return {
        title: post?.title,
        description: post?.smallDescription,
        openGraph: {
            title: post?.title,
            description: post?.smallDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                },
            ],
            url: `https://vivbyte.vercel.app/blog/${slug}`,
            type: "article",
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    const plainText = extractPlainText(post?.content);
    const readTime = calculateReadTime(plainText);

    return (
        <div>
            <BlogWrapper post={post} plainText={plainText} readTime={readTime} />
        </div>
    );
}
