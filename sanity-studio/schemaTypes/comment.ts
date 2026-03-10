import { defineType, defineField } from "sanity";

export default defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required()
        }),

        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email()
        }),

        defineField({
            name: "comment",
            title: "Comment",
            type: "text",
            validation: (Rule) => Rule.required().min(5)
        }),

        defineField({
            name: "post",
            title: "Post",
            type: "reference",
            to: [{ type: "blog" }]
        }),

        defineField({
            name: "approved",
            title: "Approved",
            type: "boolean",
            initialValue: false
        }),

        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString()
        })
    ]
});