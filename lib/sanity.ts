import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity"

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    apiVersion: "2023-05-03",
    useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
