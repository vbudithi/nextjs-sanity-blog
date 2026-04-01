import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import CodeBlockMobile from "@/app/components/CodeBlockMobile";

export const PortableTextComponentsMobile = {
    types: {
        image: ({ value }: any) => (
            <div className="my-6">
                <Image
                    src={urlFor(value).width(600).url()}
                    alt={value.alt || "Blog image"}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                />

                {value.alt && (
                    <p className="text-center text-xs text-gray-500 mt-2 px-2">
                        {value.alt}
                    </p>
                )}
            </div>
        ),

        code: ({ value }: { value: any }) => <CodeBlockMobile value={value} />,
    },

    block: {
        h1: ({ children }: any) => (
            <h1 className="text-xl font-bold mt-6 mb-3 leading-tight text-gray-900 dark:text-white">
                {children}
            </h1>
        ),

        h2: ({ children }: any) => (
            <h2 className="text-lg font-semibold mt-5 mb-2 leading-snug text-gray-900 dark:text-white">
                {children}
            </h2>
        ),

        normal: ({ children }: any) => (
            <p className="mb-4 leading-7 text-sm text-gray-900 dark:text-white">
                {children}
            </p>
        ),
    },

    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-5 space-y-2 mb-5 text-sm text-gray-900 dark:text-gray-200">
                {children}
            </ul>
        ),
    },

    listItem: {
        bullet: ({ children }: any) => (
            <li className="leading-relaxed">{children}</li>
        ),
    },

    marks: {
        strong: ({ children }: any) => (
            <strong className="text-gray-900 dark:text-white font-semibold">
                {children}
            </strong>
        ),

        code: ({ children }: any) => (
            <code className="text-gray-900 dark:text-gray-200 bg-gray-800 px-1.5 py-0.5 rounded text-xs ">
                {children}
            </code>
        ),
    },
};