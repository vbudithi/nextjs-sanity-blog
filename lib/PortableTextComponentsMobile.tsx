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


    // Custom renderer for block types (like paragraphs, headings, quote etc.) in sanity studio
    block: {
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                {children}
            </blockquote>
        ),
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
        h3: ({ children }: any) => (
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
                {children}
            </h3>
        ),

        h4: ({ children }: any) => (
            <h4 className="text-lg font-semibold mt-5 mb-2 text-gray-900 dark:text-white">
                {children}
            </h4>
        ),

        h5: ({ children }: any) => (
            <h5 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
                {children}
            </h5>
        ),

        h6: ({ children }: any) => (
            <h6 className="text-sm font-semibold mt-3 mb-2 text-gray-900 dark:text-white">
                {children}
            </h6>
        ),

        normal: ({ children }: any) => (
            <p className="mb-4 leading-7 text-sm text-gray-900 dark:text-white">
                {children}
            </p>
        ),
    },

    // Custom renderer for bullet lists  in sanity studio
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-5 space-y-2 mb-5 text-sm text-gray-900 dark:text-gray-200">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                {children}
            </ol>
        )
    },

    listItem: {
        bullet: ({ children }: any) => (
            <li className="leading-relaxed">{children}</li>
        ),
        number: ({ children }: any) => (
            <li className="leading-relaxed">{children}</li>
        ),
    },

    // Custom renderer for marks (like bold, code, etc.) in sanity studio
    marks: {
        strong: ({ children }: any) => (
            <strong className="text-gray-900 dark:text-white font-semibold">
                {children}
            </strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),

        underline: ({ children }: any) => (
            <span className="underline">{children}</span>
        ),

        code: ({ children }: any) => (
            <code className="text-gray-900 dark:text-gray-200 bg-gray-800 px-1.5 py-0.5 rounded text-xs ">
                {children}
            </code>
        ),
        blackText: ({ children }: any) => (
            <span className="text-gray-900 dark:text-white font-medium">{children}</span>
        ),
        redText: ({ children }: any) => (
            <span className="text-red-600 dark:text-red-400 font-medium">{children}</span>
        ),
        greenText: ({ children }: any) => (
            <span className="text-green-600 dark:text-green-400 font-medium">{children}</span>
        ),
        whiteText: ({ children }: any) => (
            <span className="text-white font-medium">{children}</span>
        ),
        highlight: ({ children }: any) => (
            <span className="bg-yellow-300 dark:bg-yellow-500  text-black px-1 rounded">
                {children}
            </span>
        ),
    },
};