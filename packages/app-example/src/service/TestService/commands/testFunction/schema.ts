import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const inputParameterSchema = z.object({})

export const inputPayloadSchema = extendApi(
  z.object({
    input: extendApi(z.string(), { example: '123', title: 'the input', default: 'none' }),
    one: z.string(),
  }),
)

export const outputPayloadSchema = z.object({
  my: z.object({
    payload: z.object({
      input: z.string(),
      one: z.string(),
    }),
    parameter: z.object({}),
  }),
})

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
