import { FunctionDefinitionBuilder } from '@nobush/helper'

import { generateToken } from './generateToken.impl'
import { inputParameterSchema, inputPayloadSchema, outputPayloadSchema } from './schema'

export const builder = new FunctionDefinitionBuilder('generateToken', 'generateToken endpoint', generateToken)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
