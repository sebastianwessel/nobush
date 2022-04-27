import { CommandFunction, ErrorCode, HandledError } from '@nobush/core'
import { GenerateTokenResponse, getServiceInfo } from '@nobush/service-oauth'
import { compare } from 'bcrypt'

import { getUserRepository } from '../../../../database/repositories'
import { UserService } from '../../UserService'
import { InputParameterType, InputPayloadType } from './schema'

export const authenticate: CommandFunction<UserService, InputPayloadType, InputParameterType, GenerateTokenResponse> =
  async function (payload, _parameter) {
    this.log.debug('authentication function called')

    const userRepository = await getUserRepository()

    const user = await userRepository.findOne({ where: { email: payload.email.toLowerCase() } })

    if (!user) {
      this.log.debug('user not found')
      throw new HandledError(ErrorCode.Unauthorized, 'invalid username or password')
    }

    const isPasswordCorrect = await compare(payload.password, user.passwordHash)

    if (!isPasswordCorrect) {
      this.log.debug('invalid password')
      throw new HandledError(ErrorCode.Unauthorized, 'invalid username or password')
    }

    const oAuthService = getServiceInfo()

    return this.invoke<GenerateTokenResponse>({
      receiver: {
        serviceName: oAuthService.serviceName,
        serviceVersion: oAuthService.serviceVersion,
        serviceTarget: 'generateToken',
      },
      command: {
        payload: { userId: user.uuid, status: user.status },
        parameter: {},
      },
    })
  }
