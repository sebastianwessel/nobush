import { FunctionDefinitionBuilder } from '@nobush/helper'

import { refreshTokenFunction } from './refreshTokenFunction.impl'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'

export const builder = new FunctionDefinitionBuilder('refreshToken', 'refreshToken endpoint', refreshTokenFunction)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('POST', '/auth/token/refresh')
  .addTags('OAuth')
