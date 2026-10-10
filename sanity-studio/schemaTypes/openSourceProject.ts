
import { defineType, defineField } from "sanity";

export const openSourceProject = defineType({
    name: "openSourceProject",
    title: "Open Source AI Projects",
    type: "document",
  fieldsets: [
        {
            name: "contentSection",
            title: "Project Details",
            options: { collapsible: true },
        },
        {
            name: "seo",
            title: "SEO Settings",
            options: { collapsible: true, collapsed: true },
        },
    ],
    fields: [
        defineField({
            name: "name",
            title: "Project Name",
            type: "string",
            validation: (Rule) => Rule.required(),
             fieldset: "contentSection"
        }),

        defineField({
            name: "slug",
            title: "Project Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
             fieldset: "contentSection"
        }),

        defineField({
            name: "description",
            title: "Project Description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
             fieldset: "contentSection"
        }),

        defineField({
            name: "image",
            title: "Project Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "githubUrl",
            title: "GitHub Repository URL",
            type: "url",
            validation: (Rule) =>
                Rule.required().uri({
                    scheme: ["https"],
                }),
                 fieldset: "contentSection"
        }),

        defineField({
            name: "technologies",
            title: "Technologies",
            type: "array",
            of: [{ type: "string" }],
             fieldset: "contentSection"
        }),

        defineField({
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            initialValue: false,
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

    preview: {
        select: {
            title: "name",
            media: "image",
            subtitle: "githubUrl",
        },
    },
});
