import { z } from 'zod'

export const ArticleSchema = z.object({
  id: z.number(),
  categories: z.array(z.string()),
  categoriesId: z.array(z.string()),
  likeCount: z.number(),
  photo: z.string(),
  title: z.string(),
  subtitle: z.string(),
  body: z.array(z.object({})),
  viewCount: z.number(),
  readTime: z.number(),
  status: z.enum(['draft', 'published']),
  updated: z.string(),
  created: z.string(),
  likes: z.array(z.number()),
})

export const ArticlesList = z.object({
  results: z.array(ArticleSchema),
  count: z.number(),
  next: z.string().url().optional(),
  previous: z.string().url().optional(),
})
