import { CommandFunction } from '@nobush/core'

import { TestService } from '../../TestService'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const testGet: CommandFunction<TestService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (_payload, parameter) {
    this.log.debug('test get function called')
    return {
      my: {
        parameter,
        some: 'content goes here',
      },
    }
  }
