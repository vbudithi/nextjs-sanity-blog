import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import CodeBlock from "@/app/components/CodeBlock";

export const PortableTextComponentsMobile = {
    // images
    types: {
        image: ({ value }: { value: any }) => (
            <figure className="my-12 flex flex-col items-center">
                <div className="w-full max-w-3xl px-2 md:px-0">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || "Blog image"}
                        width={1200}
                        height={700}
                        className="w-full h-auto rounded-xl object-cover"
                    />
                </div>

                {value.alt && (
                    <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-2xl">
                        {value.alt}
                    </figcaption>
                )}
            </figure>
        ),

        code: ({ value }: { value: any }) => <CodeBlock value={value} />,
    },

    // blocks
    block: {
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-5 italic text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 my-10 bg-gray-50 dark:bg-gray-900/40 py-4 rounded-r-md">
                {children}
            </blockquote>
        ),

        h1: ({ children }: any) => (
            <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white leading-tight">
                {children}
            </h1>
        ),

        h2: ({ children }: any) => (
            <h2 className="text-xl md:text-3xl font-semibold mt-12 mb-4 text-gray-900 dark:text-white">
                {children}
            </h2>
        ),

        h3: ({ children }: any) => (
            <h3 className="text-lg md:text-2xl font-semibold mt-10 mb-3 text-gray-900 dark:text-white">
                {children}
            </h3>
        ),

        h4: ({ children }: any) => (
            <h4 className="text-base md:text-lg font-semibold mt-8 mb-2 text-gray-900 dark:text-white">
                {children}
            </h4>
        ),

        h5: ({ children }: any) => (
            <h5 className="text-sm md:text-base font-semibold mt-6 mb-2 text-gray-900 dark:text-white">
                {children}
            </h5>
        ),

        h6: ({ children }: any) => (
            <h6 className="text-xs md:text-sm font-semibold mt-5 mb-2 text-gray-900 dark:text-white">
                {children}
            </h6>
        ),

        normal: ({ children }: any) => (
            <p className="text-[16.5px] md:text-lg leading-7 md:leading-8 mb-6 text-gray-800 dark:text-gray-200">
                {children}
            </p>
        ),
    },

    //lists
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 space-y-3 md:space-y-4 mb-8 text-gray-700 dark:text-gray-300 text-[16.5px] md:text-lg">
                {children}
            </ul>
        ),

        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 space-y-3 md:space-y-4 mb-8 text-gray-700 dark:text-gray-300 text-[16.5px] md:text-lg">
                {children}
            </ol>
        ),
    },

    listItem: {
        bullet: ({ children }: any) => (
            <li className="leading-relaxed">{children}</li>
        ),

        number: ({ children }: any) => (
            <li className="leading-relaxed">{children}</li>
        ),
    },

    // marks
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-semibold text-gray-900 dark:text-white">
                {children}
            </strong>
        ),

        em: ({ children }: any) => <em className="italic">{children}</em>,

        underline: ({ children }: any) => (
            <span className="underline">{children}</span>
        ),

        code: ({ children }: any) => (
            <code className="text-sm px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                {children}
            </code>
        ),

        blackText: ({ children }: any) => (
            <span className="text-gray-900 dark:text-white font-medium">
                {children}
            </span>
        ),

        redText: ({ children }: any) => (
            <span className="text-red-600 dark:text-red-400 font-medium">
                {children}
            </span>
        ),

        greenText: ({ children }: any) => (
            <span className="text-green-600 dark:text-green-400 font-medium">
                {children}
            </span>
        ),

        highlight: ({ children }: any) => (
            <span className="bg-yellow-300 dark:bg-yellow-500 text-black px-1 rounded">
                {children}
            </span>
        ),
    },
};