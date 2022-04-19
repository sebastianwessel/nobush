import { FunctionDefinitionBuilder } from '@nobush/helper'

import { inputParameterSchema, outputPayloadSchema } from './schema'
import { testGet } from './testGet.impl'

export default new FunctionDefinitionBuilder('testGet', 'some simple test function', testGet)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('GET', '/test/:id')
  .addQueryParameters({ name: 'search', required: false })
  .addTags('test')
