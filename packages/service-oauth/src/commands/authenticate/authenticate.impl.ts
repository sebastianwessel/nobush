import { CommandFunction, ErrorCode, HandledError } from '@nobush/core'
import { z } from 'zod'

import { OAuthService } from '../../OAuthService.impl'
import { outputPayloadSchema } from '../generateToken/schema'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

type GenerateTokenResponse = z.infer<typeof outputPayloadSchema>

export const authenticate: CommandFunction<OAuthService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, _parameter) {
    this.log.debug('authentication function called')

    if (payload.username !== payload.password) {
      throw new HandledError(ErrorCode.Unauthorized, 'invalid username or password')
    }

    const token = this.invoke<GenerateTokenResponse>({
      receiver: {
        serviceName: this.serviceInfo.serviceName,
        serviceVersion: this.serviceInfo.serviceVersion,
        serviceTarget: 'generateToken',
      },
      command: {
        payload: { userId: '123' },
        parameter: {},
      },
    })

    return token
  }
