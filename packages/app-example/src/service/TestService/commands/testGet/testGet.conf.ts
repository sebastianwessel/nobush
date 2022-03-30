import { FunctionDefinitionBuilder } from '@nobush/helper'

import { inputParameterSchema, outputPayloadSchema } from './schema'
import { testGet } from './testGet.impl'

export const builder = new FunctionDefinitionBuilder('testGet', 'some simple test function', testGet)
  // .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('GET', '/test/:id')
