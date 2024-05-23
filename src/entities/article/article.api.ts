import { ArticlesList, Article } from './article.types'
import $api from '~shared/lib/api'

const URL = 'http://ittipak.api.ustaz.online/'

export function getArticleQuery() {
  return $api.get<ArticlesList>(`${URL}api/articles`)
}

export function getArticleDetailsQuery(id: number) {
  return $api.get<Article>(`${URL}api/articles/${id}`)
}
