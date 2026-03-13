import { defineType, defineField } from "sanity";

export default defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title of blog article",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "titleImage",
            title: "Title Image",
            type: "image",
            options: { hotspot: true },
        }),

        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "smallDescription",
            title: "Small Description",
            type: "text",
        }),

        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),

        // ✅ ADD THIS
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "tag" }],
                },
            ],
        }),
    ],
});