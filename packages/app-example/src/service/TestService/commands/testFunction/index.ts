import { FunctionDefinitionBuilder } from '@nobush/helper'

import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'
import { testFunction } from './testFunction.impl'

export default new FunctionDefinitionBuilder('testFunction', 'some simple test function', testFunction)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .addTags('test')
  .exposeAsHttpEndpoint('POST', '/test')
