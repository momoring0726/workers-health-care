import { defineField, defineType } from "sanity";

export const newsCategory = defineType({
  name: "newsCategory",
  title: "News Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Optional description for this category",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
