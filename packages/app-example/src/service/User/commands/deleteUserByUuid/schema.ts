import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const pathParameterSchema = z.object({
  uuid: extendApi(z.string().uuid(), { example: 'e118e649-09c4-4d00-917b-3a0a940e1d45', title: 'the users uuid' }),
})
export const inputQuerySchema = z.object({})
export const inputParameterSchema = pathParameterSchema.merge(inputQuerySchema)

export const inputPayloadSchema = z.undefined()

export const outputPayloadSchema = z.void()

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
