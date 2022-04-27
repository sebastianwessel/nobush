import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const inputPayloadSchema = extendApi(
  z.object({
    email: extendApi(z.string().email(), { example: 'email@example.com', title: 'the users email' }),
    password: extendApi(z.string(), { example: 'my_secret_password', title: 'the password' }),
  }),
)

export const inputParameterSchema = z.object({})

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
