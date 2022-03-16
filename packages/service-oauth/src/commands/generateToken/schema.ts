import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

import { DEFAULT_TOKEN_EXPIRE } from '../../config'

export const inputParameterSchema = z.object({})

export const inputPayloadSchema = extendApi(
  z.object({
    userId: extendApi(z.string(), { example: '57529825-d69e-4cbc-94f4-23de1d6b6ab0', title: 'id of user entity' }),
  }),
)

export const outputPayloadSchema = extendApi(
  z.object({
    token: extendApi(z.string(), { example: 'my_name', title: 'the access token' }),
    refreshToken: extendApi(z.string(), { example: 'my_name', title: 'the refresh token' }),
    expiresIn: extendApi(z.union([z.string(), z.number()]), {
      example: DEFAULT_TOKEN_EXPIRE,
      title: 'token expiration',
      description: 'a number value in seconds or a string',
      examples: ['1d', 60],
      default: DEFAULT_TOKEN_EXPIRE,
    }),
  }),
)

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
