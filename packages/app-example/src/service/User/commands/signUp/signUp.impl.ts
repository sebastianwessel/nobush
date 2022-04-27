import { CommandFunction, ErrorCode, HandledError, UnhandledError } from '@nobush/core'
import { hash } from 'bcrypt'

import { isConstraintError } from '../../../../database'
import { getUserRepository } from '../../../../database/repositories'
import { UserService } from '../../UserService'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const signUp: CommandFunction<UserService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, _parameter) {
    this.log.debug('signup new user')

    const userRepository = await getUserRepository()

    const passwordHash = await hash(payload.password, 10)

    const newUser = userRepository.create({ passwordHash, email: payload.email })

    try {
      await userRepository.save(newUser)
    } catch (err) {
      if (isConstraintError(err)) {
        this.log.warn('email already exist in database', newUser.email)
        throw new HandledError(ErrorCode.Conflict, 'email already exists')
      }

      this.log.error(err)
      throw new UnhandledError(ErrorCode.InternalServerError, 'unable to create new user')
    }

    this.log.debug(`new user created ${newUser.uuid}`)

    return {
      uuid: newUser.uuid,
    }
  }
