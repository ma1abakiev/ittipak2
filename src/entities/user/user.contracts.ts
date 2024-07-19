import { z } from 'zod'
import { articleContracts } from '~entities/article'

export const LoginUserDtoSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
})

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
})

export const ActivationData = z.object({
  uid: z.string(),
  token: z.string(),
})

export const TokensDtoSchema = z.object({
  access: z.string(),
  refresh: z.string(),
})

export const UserDtoSchema = z.object({
  id: z.number(),
  password: z.string(),
  lastLogin: z.string(), // Consider adjusting to Date if needed
  isSuperuser: z.boolean(),
  username: z.string(),
  role: z.string(),
  isActive: z.boolean(),
  dateJoined: z.string(), // Consider adjusting to Date if needed
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),
  groups: z.array(z.number()),
  userPermissions: z.array(z.number()),
  favoriteArticles: z.array(z.number()),
})
