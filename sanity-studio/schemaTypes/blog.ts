import { defineType, defineField } from "sanity";

export default defineType({
    name: "blog",
    title: "Blog",
    type: "document",

    fieldsets: [
        {
            name: "contentSection",
            title: "Article Content",
            options: { collapsible: true }
        },
        {
            name: "seo",
            title: "SEO Settings",
            options: { collapsible: true, collapsed: true }
        }

    ],

    fields: [
        defineField({
            name: "title",
            title: "Title of blog article",
            type: "string",
            validation: (Rule) => Rule.required(),
            fieldset: "contentSection"
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
            fieldset: "contentSection"
        }),

        defineField({
            name: "titleImage",
            title: "Title Image",
            type: "image",
            options: { hotspot: true },
            fieldset: "contentSection"
        }),

        defineField({
            name: "smallDescription",
            title: "Small Description",
            type: "text",
            fieldset: "contentSection"
        }),

        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading 1", value: "h1" },
                        { title: "Heading 2", value: "h2" },
                        { title: "Heading 3", value: "h3" },
                        { title: "Heading 4", value: "h4" },
                        { title: "Heading 5", value: "h5" },
                        { title: "Heading 6", value: "h6" },
                        { title: "Quote", value: "blockquote" }
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                            { title: "Underline", value: "underline" },
                            { title: "Strike", value: "strike-through" },
                            { title: "Black", value: "blackText" },
                            { title: "White", value: "whiteText" },
                            { title: "Red", value: "redText" },
                            { title: "Green", value: "greenText" },
                            { title: "Highlight", value: "highlight" },
                        ],
                    },


                },


                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt text",
                        },
                    ],
                },

                {
                    type: "code",
                    title: "Code Block",
                    options: {
                        withFilename: true,
                        language: "javascript",
                    },
                },


            ],
            fieldset: "contentSection"
        }),

        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            fieldset: "contentSection"
        }),

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
            fieldset: "contentSection"
        }),

        //SEO Fields

        defineField({
            name: "seoTitle",
            title: "SEO Title",
            type: "string",
            description: "Title shown in Google search results.",
            fieldset: "seo",
        }),

        defineField({
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
            rows: 3,
            description: "Short description for Google and social media previews.",
            fieldset: "seo",
        }),

        defineField({
            name: "ogImage",
            title: "Open Graph Image",
            type: "image",
            description: "Image used for social sharing (1200x630 recommended).",
            options: { hotspot: true },
            fieldset: "seo",
        }),

        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
            description: "Optional. Helps avoid duplicate content issues.",
            fieldset: "seo",
        }),

        defineField({
            name: "noIndex",
            title: "Hide from Search Engines",
            type: "boolean",
            description: "Enable this to prevent Google from indexing this page.",
            fieldset: "seo",
        }),
    ],
});