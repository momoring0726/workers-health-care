import { defineField, defineType } from "sanity";

/**
 * Program Schema
 *
 * Represents insurance plans that clients can manage.
 * Supports various pricing structures (monthly family rates, annual, etc.)
 * and detailed benefit information for each plan.
 */
export const program = defineType({
  name: "program",
  title: "Insurance Programs",
  type: "document",
  fields: [
    // Basic Info
    defineField({
      name: "title",
      title: "Program Title",
      type: "string",
      placeholder: "e.g., Plan 300, Plan 7000",
      validation: (Rule) => Rule.required().max(100),
      description: "Name of the insurance plan",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly identifier (auto-generated from title)",
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(20).max(300),
      placeholder: "Brief overview of the plan benefits and target audience",
      description: "Displayed on the programs page",
    }),

    // Features List
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
      description: "Quick bullet points of main benefits",
    }),

    // Pricing
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      fields: [
        defineField({
          name: "principal",
          title: "Principal Monthly",
          type: "string",
          placeholder: "₱300/month",
          description: "Primary member rate if applicable",
        }),
        defineField({
          name: "spouse",
          title: "Spouse Monthly",
          type: "string",
          placeholder: "₱290/month",
          description: "Spouse coverage rate if applicable",
        }),
        defineField({
          name: "child",
          title: "Child Monthly",
          type: "string",
          placeholder: "₱240/month",
          description: "Per child rate if applicable",
        }),
        defineField({
          name: "parent",
          title: "Parent Monthly",
          type: "string",
          placeholder: "₱350/month",
          description: "Parent coverage rate if applicable",
        }),
        defineField({
          name: "sibling",
          title: "Sibling Monthly",
          type: "string",
          placeholder: "₱290/month",
          description: "Per sibling rate if applicable",
        }),
        defineField({
          name: "annual",
          title: "Annual Rate",
          type: "string",
          placeholder: "₱7,000/year",
          description: "Full year rate if applicable",
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: "Define pricing for different membership types",
    }),

    // Detailed Benefits
    defineField({
      name: "benefits",
      title: "Detailed Benefits",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "benefit",
          title: "Benefit",
          fields: [
            defineField({
              name: "title",
              title: "Benefit Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              placeholder: "e.g., Annual Maximum Benefit (AMB)",
            }),
            defineField({
              name: "description",
              title: "Detailed Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
              placeholder: "Full details about this benefit",
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
            },
            prepare({ title }) {
              return {
                title,
                subtitle: "Benefit",
              };
            },
          },
        }),
      ],
      description:
        "Expanded explanations of all benefits included in this plan",
    }),

    // Hospitalization Rates
    defineField({
      name: "hospitalizationRates",
      title: "Hospitalization Rates",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "rate",
          title: "Rate",
          fields: [
            defineField({
              name: "category",
              title: "Member Category",
              type: "string",
              validation: (Rule) => Rule.required(),
              placeholder: "e.g., Principal, Spouse, Child",
            }),
            defineField({
              name: "monthly",
              title: "Monthly Rate",
              type: "string",
              placeholder: "₱300.00",
            }),
            defineField({
              name: "annual",
              title: "Annual Rate",
              type: "string",
              placeholder: "₱3,600.00",
            }),
          ],
          preview: {
            select: {
              category: "category",
              monthly: "monthly",
              annual: "annual",
            },
            prepare({ category, monthly, annual }) {
              return {
                title: category,
                subtitle: `${monthly || "N/A"} / ${annual || "N/A"}`,
              };
            },
          },
        }),
      ],
      description:
        "Optional: Detailed hospitalization rate breakdown by member type",
    }),

    // Eligibility Schedule
    defineField({
      name: "eligibilitySchedule",
      title: "Eligibility/Waiting Period Schedule",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "schedule",
          title: "Schedule",
          fields: [
            defineField({
              name: "period",
              title: "Time Period",
              type: "string",
              validation: (Rule) => Rule.required(),
              placeholder: "e.g., Start of effectivity to 3rd month",
            }),
            defineField({
              name: "benefit",
              title: "Benefit Amount",
              type: "string",
              validation: (Rule) => Rule.required(),
              placeholder: "e.g., ₱0.00 (Waiting period) or ₱15,000.00",
            }),
          ],
          preview: {
            select: {
              period: "period",
              benefit: "benefit",
            },
            prepare({ period, benefit }) {
              return {
                title: period,
                subtitle: benefit,
              };
            },
          },
        }),
      ],
      description: "Optional: Progressive benefit schedule or waiting periods",
    }),

    // Order/Display
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      description: "Controls the order plans appear on the website",
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Show this program on the website",
    }),

    defineField({
      name: "highlighted",
      title: "Highlight as Most Popular",
      type: "boolean",
      initialValue: false,
      description:
        "Mark this plan as 'Most Popular' - only one plan should be highlighted at a time",
    }),

    // Internal Notes
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 2,
      description: "Not shown to users - for internal reference only",
    }),
  ],

  // Preview for Sanity Studio
  preview: {
    select: {
      title: "title",
      pricing: "pricing.principal",
      active: "isActive",
    },
    prepare({ title, pricing, active }) {
      return {
        title,
        subtitle: `${pricing || "Custom pricing"} ${active ? "" : "• INACTIVE"}`,
        media: active ? "✓" : "✕",
      };
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
