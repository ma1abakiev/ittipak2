import $api from '~shared/lib/api';
import { ArticlesList, Article, CreateArticleDto } from './article.types';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

const API_URL = 'http://ittipak.api.ustaz.online/';

function getCurrentLanguage() {
  return getCookie('language') || 'ru'; // Язык по умолчанию — 'ru'
}

export function getArticleQuery() {
  const lang = getCurrentLanguage();
  return axios.get<ArticlesList>(`${API_URL}api/articles/`, {
    headers: { 'Accept-Language': lang },
  });
}

export function getArticleDetailsQuery(id: number) {
  const lang = getCurrentLanguage();
  return axios.get<Article>(`${API_URL}api/articles/${id}/`, {
    headers: { 'Accept-Language': lang },
  });
}

export function getFavoriteArticles() {
  const lang = getCurrentLanguage();
  return $api.get('/api/users/favorite/', {
    headers: { 'Accept-Language': lang },
  });
}

export function likeArticleQuery(id: number) {
  const lang = getCurrentLanguage();
  return $api.get(`api/articles/like/${id}`, {
    headers: { 'Accept-Language': lang },
  });
}

export function createArticleMutation(props: CreateArticleDto = {}) {
  const lang = getCurrentLanguage();
  return $api.post(`api/articles/admin/`, props, {
    headers: { 'Accept-Language': lang },
  });
}

export function editArticle(props: any = {}) {
  const lang = getCurrentLanguage();
  return $api.patch(
    `api/articles/admin/${String(props.data.id)}/`,
    props.data,
    {
      headers: { 'Accept-Language': lang },
    }
  );
}

export function favoriteArticleQuery(id: number) {
  const lang = getCurrentLanguage();
  return $api.get(`api/users/favorite/${id}/`, {
    headers: { 'Accept-Language': lang },
  });
}

export function archivedArticle(id: number) {
  const lang = getCurrentLanguage();
  return $api.patch(
    `articles/me/${id}/`,
    { status: 'archived' },
    {
      headers: { 'Accept-Language': lang },
    }
  );
}
