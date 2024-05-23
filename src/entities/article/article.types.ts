import { z } from 'zod'
import { ArticleSchema, ArticlesList } from './article.contracts'

export type Article = z.infer<typeof ArticleSchema>
export type ArticlesList = z.infer<typeof ArticlesList>
