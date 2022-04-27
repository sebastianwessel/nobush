import { ErrorCode } from '@nobush/core'
import { FunctionDefinitionBuilder } from '@nobush/helper'
import { generateTokenResponseSchema } from '@nobush/service-oauth'

import { SERVICE_INFO } from '../../config'
import { authenticate } from './authenticate.impl'
import { inputParameterSchema, inputPayloadSchema } from './schema'

export default new FunctionDefinitionBuilder('authenticate', 'authenticate endpoint for existing users', authenticate)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(generateTokenResponseSchema)
  .exposeAsHttpEndpoint('POST', '/public/authenticate')
  .addTags(SERVICE_INFO.serviceName, 'Public')
  .addErrorStatusCodes(ErrorCode.Unauthorized)
