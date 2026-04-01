"use client";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
export default function BackButton() {

    const router = useRouter();
    return (
        <div className="max-w-3xl mx-auto py-6">
            <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
            >

                <ArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                <span>Back to articles</span>
            </button>
        </div>
    )
}
