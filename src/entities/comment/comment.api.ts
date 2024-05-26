import $api from '~shared/lib/api';
import { CreateComment } from './comment.types';

export function getComments(id: number) {
  return $api.get(`api/articles/${id}/comment/`);
}

export function createComment(params: { comment: CreateComment }) {
  return $api.post(
    `api/articles/${params.comment.article}/comment/`,
    params.comment
  );
}

export function updateComment(
  articleId: number,
  commentId: number,
  comment: any = {}
) {
  return $api.patch(`api/aricles/${articleId}/comment/${commentId}/`, comment);
}

export function deleteComment(params: {
  articleId: number;
  commentId: number;
}) {
  return $api.delete(
    `api/articles/${params.articleId}/comment/${params.commentId}/`
  );
}