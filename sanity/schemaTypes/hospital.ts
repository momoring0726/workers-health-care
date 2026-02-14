import { defineField, defineType } from "sanity";

export const hospital = defineType({
  name: "hospital",
  title: "Accredited Facilities",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Hospital", value: "Hospital" },
          { title: "Clinic", value: "Clinic" },
          { title: "Doctor", value: "Doctor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "location" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Website",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location.name",
    },
  },
});
