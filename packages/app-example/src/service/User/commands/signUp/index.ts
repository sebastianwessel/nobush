import { ErrorCode } from '@nobush/core'
import { FunctionDefinitionBuilder } from '@nobush/helper'

import { SERVICE_INFO } from '../../config'
import { UserServiceFunction } from '../../types'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'
import { signUp } from './signUp.impl'

export default new FunctionDefinitionBuilder(UserServiceFunction.SignUp, 'Sign up a new unknown user', signUp)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .addTags(SERVICE_INFO.serviceName, 'Public')
  .exposeAsHttpEndpoint('POST', '/public/signup')
  .addErrorStatusCodes(ErrorCode.Conflict)
