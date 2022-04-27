import { CommandFunction, ErrorCode, HandledError } from '@nobush/core'

import { getUserRepository } from '../../../../database/repositories'
import type { UserService } from '../../UserService'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const getUserByUuid: CommandFunction<UserService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (_payload, parameter) {
    this.log.debug('get user by uuid')
    const userRepository = await getUserRepository()
    const user = await userRepository.findOne({ where: { uuid: parameter.uuid } })

    if (!user) {
      throw new HandledError(ErrorCode.NotFound, 'user could not be found')
    }
    return user
  }
