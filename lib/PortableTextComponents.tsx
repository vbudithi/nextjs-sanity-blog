import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import CodeBlock from "@/app/components/CodeBlock";

export const portableTextComponents = {
    // Custom renderer for images in content in sanity studio
    types: {
        image: ({ value }: { value: any }) => (
            <Image
                src={urlFor(value).url()}
                alt={value.alt || "Blog image"}
                width={700}
                height={400}
                className="rounded-xl my-6"
            />
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

};