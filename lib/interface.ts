export interface simpleBlogCard {
    _id: string;
    title: string,
    smallDescription: string,
    currentSlug: string,
    titleImage: any,
    publishedAt: string,
    content: {
        _type: "block";
        children: {
            text: string;
        }[];
    }[];
    tags?: {
        title: string;
        slug: {
            current: string;
        };
    }[];
}