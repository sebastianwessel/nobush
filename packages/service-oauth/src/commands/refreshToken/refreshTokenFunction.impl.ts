import { CommandFunction } from '@nobush/core'

import { DEFAULT_TOKEN_EXPIRE } from '../../config'
import { OAuthService } from '../../OAuthService.impl'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const refreshTokenFunction: CommandFunction<
  OAuthService,
  InputPayloadType,
  InputParameterType,
  OutputPayloadType
> = async function (_payload, _parameter) {
  this.log.debug('refresh token function called')

  const token = ''
  const refreshToken = ''

  return {
    token,
    refreshToken,
    expiresIn: this.options.token.expireIn || DEFAULT_TOKEN_EXPIRE,
  }
}
