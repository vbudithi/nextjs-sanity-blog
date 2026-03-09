"use client";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
export default function BackButton() {

    const router = useRouter();
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1 px-3 py-1 rounded-md 
             bg-gray-200 text-gray-800 
             dark:bg-gray-700 dark:text-gray-200
             hover:bg-gray-300 dark:hover:bg-gray-600
             transition cursor-pointer font-medium"

            >
                <ArrowLeft size={25} /><span>Back</span>

            </button>
        </div>

    )
}
