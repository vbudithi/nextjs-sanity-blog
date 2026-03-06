import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity"

export const sanityClient = createClient({
    projectId: "iycl5m0q",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}
