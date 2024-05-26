import { z } from 'zod'
import {
  ArticleLike,
  ArticleSchema,
  ArticlesList,
  CreateArticleDtoSchema,
} from './article.contracts'

export type Article = z.infer<typeof ArticleSchema>
export type ArticlesList = z.infer<typeof ArticlesList>
export type ArticleLike = z.infer<typeof ArticleLike>

export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>
