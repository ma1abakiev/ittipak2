import { useQuery } from '@tanstack/react-query'

import { getArticleDetailsQuery, getArticleQuery } from './article.api'

const keys = {
  root: () => ['article'],
  article: (id: number) => [...keys.root(), 'byId', id] as const,
}

export function useGetArticles() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getArticleQuery,
  })
}

export function useGetArticleDetail(id: number) {
  return useQuery({
    queryKey: keys.article(id),
    queryFn: () => getArticleDetailsQuery(id),
  })
}
