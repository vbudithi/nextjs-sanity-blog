import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import CodeBlock from "@/app/components/CodeBlock";

export const portableTextComponents = {
    // Custom renderer for images in content in sanity studio
    types: {
        image: ({ value }: { value: any }) => (
            <div className="my-10 flex justify-center">
                <div className="w-full max-w-xl">
                    <Image
                        src={urlFor(value).width(600).url()}
                        alt={value.alt || "Blog image"}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-xl object-contain"
                    />
                    {value.alt && (
                        <p className="text-center text-sm text-gray-500 mt-2">
                            {value.alt}
                        </p>
                    )}
                </div>
            </div>
        ),

        code: ({ value }: { value: any }) => <CodeBlock value={value} />,
    },

    // Custom renderer for block types (like paragraphs, headings, etc.) in sanity studio
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>
        ),

        h2: ({ children }: any) => (
            <h2 className="text-2xl font-semibold mt-8 mb-3">{children}</h2>
        ),

        normal: ({ children }: any) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
    },

    // Custom renderer for bullet lists  in sanity studio
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-500" >
                {children}
            </ul>
        ),
    },

    listItem: {
        bullet: ({ children }: any) => (
            <li className="leading-relaxed" > {children} </li>
        ),
    },

    // Custom renderer for marks (like bold, code, etc.) in sanity studio
    marks: {
        strong: ({ children }: any) => (
            <strong className="text-white font-semibold" > {children} </strong>
        ),

        code: ({ children }: any) => (
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm" >
                {children}
            </code>
        ),
    },

};