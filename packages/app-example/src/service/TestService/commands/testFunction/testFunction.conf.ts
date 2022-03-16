import { FunctionDefinitionBuilder } from '@nobush/helper'

import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'
import { testFunction } from './testFunction.impl'

export const builder = new FunctionDefinitionBuilder('testFunction', 'some simple test function', testFunction)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('POST', '/test/:id')
