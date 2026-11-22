import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const schema = z.object({title:z.string(),description:z.string(),placeholder:z.boolean().default(true),featured:z.boolean().default(false)});
export const collections = {
 projects: defineCollection({loader:glob({pattern:'**/*.mdx',base:'./src/content/projects'}),schema}),
 writeups: defineCollection({loader:glob({pattern:'**/*.mdx',base:'./src/content/writeups'}),schema})
};
