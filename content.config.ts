import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "posts/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        author: z.string(),
      }),
    }),
    businesses: defineCollection({
      type: "page",
      source: "businesses/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        address: z.string(),
        phone: z.string().optional(),
        website: z.string().optional(),
        hours: z.string().optional(),
        featured: z.boolean().optional(),
      }),
    }),
  },
});
