import { CommandFunction } from '@nobush/core'

import { TestService } from '../../TestService'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const testFunction: CommandFunction<TestService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, parameter) {
    this.log.debug('test function called')
    return {
      my: {
        payload,
        parameter,
      },
    }
  }
