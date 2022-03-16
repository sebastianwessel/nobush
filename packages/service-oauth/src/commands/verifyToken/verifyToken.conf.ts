import { FunctionDefinitionBuilder } from '@nobush/helper'

import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'
import { verifyToken } from './verifyToken.impl'

export const builder = new FunctionDefinitionBuilder('verifyToken', 'verifyToken endpoint', verifyToken)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('POST', '/auth/token/verify')
