import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

import { UserStatus } from '../../types'

export const pathParameterSchema = z.object({})
export const inputQuerySchema = z.object({})
export const inputParameterSchema = pathParameterSchema.merge(inputQuerySchema)

export const inputPayloadSchema = z.undefined()

export const outputPayloadSchema = z.array(
  z.object({
    uuid: extendApi(z.string().uuid(), { example: 'e118e649-09c4-4d00-917b-3a0a940e1d45', title: 'the users uuid' }),
    passwordHash: z.string().nullable(),
    status: extendApi(z.nativeEnum(UserStatus), {
      example: UserStatus.Active,
      title: 'the users account status',
      enum: Object.values(UserStatus),
    }),
    email: extendApi(z.string().email().nullable(), { example: 'email@example.com', title: 'the users email address' }),
    createdAt: extendApi(z.date(), {
      example: '2022-04-24T16:11:03.000Z',
      title: 'the timestamp when the user was created',
    }),
    updatedAt: extendApi(z.date(), {
      example: '2022-04-24T16:11:03.000Z',
      title: 'the timestamp when the user was updated',
    }),
  }),
)

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
