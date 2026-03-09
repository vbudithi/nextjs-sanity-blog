import { Card, CardContent } from '@/components/ui/card'
import { simpleBlogCard } from '@/lib/interface';
import { urlFor } from '@/lib/sanity';
import Image from "next/image";
import Link from 'next/link';

export default function BlogCard({ post }: { post: simpleBlogCard }) {
    const href = `/blog/${post?.currentSlug}` || "#";
    return (
        <Link href={href} className="block">
            <Card className=" bg-slate-50! dark:bg-gray-900! transition-all duration-300 hover:scale-105 hover:bg-slate-100! cursor-pointer">
                <Image src={urlFor(post.titleImage).url()} alt={post.titleImage} width={500} height={500} className="rounded-t-lg h-50 object-cover cursor-pointer" />
                <CardContent className="mt-5">
                    <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
                </CardContent>
            </Card>
        </Link>

    )
}