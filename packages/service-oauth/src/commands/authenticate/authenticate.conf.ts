import { FunctionDefinitionBuilder } from '@nobush/helper'

import { authenticate } from './authenticate.impl'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'

export const builder = new FunctionDefinitionBuilder('authenticate', 'authenticate endpoint', authenticate)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('POST', '/auth/authenticate')
  .addTags('OAuth')
