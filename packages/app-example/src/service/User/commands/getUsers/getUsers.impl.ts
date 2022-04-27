import { CommandFunction } from '@nobush/core'

import { getUserRepository } from '../../../../database/repositories'
import type { UserService } from '../../UserService'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const getUsers: CommandFunction<UserService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (_payload, _parameter) {
    this.log.debug('list all users')
    const userRepository = await getUserRepository()
    return userRepository.find()
  }
