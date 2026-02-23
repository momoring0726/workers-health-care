import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "News & Announcements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "newsCategory" }],
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: false,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this news item prominently on the news page",
    }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Article Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Alternative text for accessibility",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
      description: "Upload images for the article gallery",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      date: "date",
    },
    prepare({ title, category, date }) {
      return {
        title,
        subtitle: `${category || "Uncategorized"} • ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
