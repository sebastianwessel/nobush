import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const inputPayloadSchema = extendApi(z.undefined())

export const pathParameterSchema = z.object({
  id: extendApi(
    z.preprocess((a) => parseInt(a as string, 10), z.number().positive().max(100)),
    { example: 123, description: 'the id of entity' },
  ),
})
export const inputQuerySchema = z.object({
  search: z.string().optional(),
})

export const inputParameterSchema = pathParameterSchema.merge(inputQuerySchema)

export const outputPayloadSchema = z.object({
  my: z.object({
    parameter: z.object({
      id: z.number(),
      search: z.string().optional(),
    }),
    some: z.string(),
  }),
})

export type InputPayloadType = z.infer<typeof inputPayloadSchema>
export type InputParameterType = z.infer<typeof inputParameterSchema>
export type OutputPayloadType = z.infer<typeof outputPayloadSchema>
