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
    token: extendApi(z.string(), {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTA5MTc2MTYsImV4cCI6MTY1MDkxODUxNiwiYXVkIjoidXNlcjphY2Nlc3M6dG9rZW4iLCJpc3MiOiJvYXV0aDpzZXJ2ZXIiLCJzdWIiOiIxMjMifQ.GxS1jgtV1kfFJYKwmHxDryJxbg6aRJO7Bdgg1gmrmjE',
      title: 'the access token',
    }),
    refreshToken: extendApi(z.string(), {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5lcmF0ZWQiOiIyMDIyLTA0LTI1VDIwOjEzOjM2LjU5NFoiLCJfaWQiOiJSc3BOMy1hY1BfaEhwSlNyS1FnaFgiLCJpYXQiOjE2NTA5MTc2MTYsImV4cCI6MTY1MjEyNzIxNiwiYXVkIjoidXNlcjphY2Nlc3M6cmVmcmVzaDp0b2tlbiIsImlzcyI6Im9hdXRoOnNlcnZlciIsImp0aSI6IllsRmdQQ1RpOWlzc1lKZFRHczJ2WCJ9.OhBqb_G27X55Lmu063d98u4cxWok5bKsJqb91JzDsnU',
      title: 'the refresh token',
    }),
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
