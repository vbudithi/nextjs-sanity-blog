import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from "next/link";

export default function ExploreButton() {
    return (
        <Link href="/">
            <Button
                variant="secondary"
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[12px] font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700 transition-colors cursor-pointer border border-gray-200 dark:border-neutral-700"
            >
                Explore Blogs
                <ArrowRight size={14} />
            </Button>
        </Link>
    )
}
