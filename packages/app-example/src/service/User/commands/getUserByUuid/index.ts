import { FunctionDefinitionBuilder } from '@nobush/helper'

import { SERVICE_INFO } from '../../config'
import { UserServiceFunction } from '../../types'
import { getUserByUuid } from './getUserByUuid.impl'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'

export default new FunctionDefinitionBuilder(
  UserServiceFunction.GetUserByUuid,
  'fetch a single user by uuid',
  getUserByUuid,
)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .addTags(SERVICE_INFO.serviceName)
  .exposeAsHttpEndpoint('GET', '/users/:uuid')
