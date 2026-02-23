import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Must be a valid email address",
        ),
    }),
    defineField({
      name: "phones",
      title: "Phone Numbers",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one phone number is required"),
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      email: "email",
      phones: "phones",
    },
    prepare({ email, phones }) {
      const phoneDisplay =
        phones && phones.length > 0 ? phones.join(", ") : "No phones";
      return {
        title: "Contact Information",
        subtitle: `${email} • ${phoneDisplay}`,
      };
    },
  },
});
