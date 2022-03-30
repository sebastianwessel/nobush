import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

import { DEFAULT_TOKEN_EXPIRE } from '../../config'

export const inputPayloadSchema = extendApi(
  z.object({
    username: extendApi(z.string(), { example: 'my_name', title: 'the username' }),
    password: extendApi(z.string(), { example: 'my_secret_password', title: 'the password' }),
  }),
)

export const inputParameterSchema = z.object({})

export const outputPayloadSchema = extendApi(
  z.object({
    token: extendApi(z.string(), { example: 'my_name', title: 'the access token' }),
    refreshToken: extendApi(z.string(), { example: 'my_name', title: 'the refresh token' }),
    expiresIn: extendApi(z.union([z.string(), z.number()]), {
      example: DEFAULT_TOKEN_EXPIRE,
      title: 'token expiration',
      description: 'a number value in seconds or a string',
      default: DEFAULT_TOKEN_EXPIRE,
    }),
  }),
)

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
