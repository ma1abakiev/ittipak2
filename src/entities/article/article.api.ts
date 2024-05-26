import $api from '~shared/lib/api'
import { ArticlesList, Article, CreateArticleDto } from './article.types'
import axios from 'axios'

const API_URL = 'http://ittipak.api.ustaz.online/'

export function getArticleQuery() {
  return axios.get<ArticlesList>(`${API_URL}api/articles/`)
}

export function getArticleDetailsQuery(id: number) {
  return axios.get<Article>(`${API_URL}api/articles/${id}/`)
}



export function getFavoriteArticles() {
  return $api.get('/api/users/favorite/')
}

export function getWriterArticles() {
  return $api.get<ArticlesList>('api/articles/me/')
}

export function likeArticleQuery(id: number) {
  return $api.get(`api/articles/like/${id}`)
}

export function createArticleMutation(props: CreateArticleDto = {}) {
  return $api.post(`api/articles/admin/`, props)
}

export function editArticle(props: any = {}) {
  return $api.patch(`articles/me/${String(props.data.id)}/`, props.data)
}

export function favoriteArticleQuery(id: number) {
  return $api.get(`api/users/favorite/${id}/`)
}

export function archivedArticle(id: number) {
  return $api.patch(`articles/me/${id}/`, { status: 'archived' })
}
