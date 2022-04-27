import { FunctionDefinitionBuilder } from '@nobush/helper'

import { SERVICE_INFO } from '../../config'
import { UserServiceFunction } from '../../types'
import { getUserByUuid } from './getUserByUuid.impl'
import { inputParameterSchema, inputPayloadSchema } from './schema'

export default new FunctionDefinitionBuilder(
  UserServiceFunction.GetUserByUuid,
  'delete a single user by uuid',
  getUserByUuid,
)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addTags(SERVICE_INFO.serviceName)
  .exposeAsHttpEndpoint('DELETE', '/users/:uuid')
