export interface simpleBlogCard {
    title: string,
    smallDescription: string,
    currentSlug: string,
    titleImage: any,
    publishedAt: string,
    tags?: {
        title: string;
        slug: {
            current: string;
        };
    }[];
}