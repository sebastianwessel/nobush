import { FunctionDefinitionBuilder } from '@nobush/helper'

import { SERVICE_INFO } from '../../config'
import { UserServiceFunction } from '../../types'
import { getUsers } from './getUsers.impl'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'

export default new FunctionDefinitionBuilder(UserServiceFunction.GetUsers, 'List all known users', getUsers)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .addTags(SERVICE_INFO.serviceName)
  .exposeAsHttpEndpoint('GET', '/users')
