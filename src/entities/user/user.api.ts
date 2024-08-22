import {
  ActivationData,
  CreateUserSchema,
  LoginUserDto,
  TokensDtoSchema,
  UserDtoSchema,
} from './user.types'
import $api from '~shared/lib/api'

export function getTokenMutation(params: { user: LoginUserDto }) {
  return $api.post<TokensDtoSchema>('api/jwt/create/', params.user)
}

export function loginUserQuery() {
  return $api.get<UserDtoSchema>('api/users/me/')
}

export function registerUserMutation(params: { user: CreateUserSchema }) {
  return $api.post('api/users/', params.user)
}

export function emailActivationMutation(params: { data: ActivationData }) {
  return $api.post('api/users/activation/', params.data)
}
export function editUserProfile(params: { user: EditUserProfile }) {
  return $api.patch('api/users/me/', params.user);
}