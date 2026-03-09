import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from "next/link";


export default function ExploreButton() {
    return (
        <Link href="/all-posts">
            <Button
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer font-medium"
            >
                Explore More Blogs
                <ArrowRight size={16} />
            </Button>
        </Link>
    )
}
