import { CommandFunction, ErrorCode, HandledError } from '@nobush/core'
import { verify } from 'jsonwebtoken'

import { DEFAULT_TOKEN_EXPIRE } from '../../config'
import { OAuthService } from '../../OAuthService.impl'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const verifyToken: CommandFunction<OAuthService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, _parameter) {
    this.log.debug('verify token function called')

    const _x = new Promise((resolve, reject) => {
      verify(
        payload.token,
        this.options.token.publicKey,
        { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' },
        (err, payload) => {
          if (err) {
            reject(new HandledError(ErrorCode.Unauthorized, err.message))
          }
          resolve(payload)
        },
      )
    })

    const token = ''
    const verifyToken = ''
    const refreshToken = ''

    return {
      token,
      verifyToken,
      expiresIn: this.options.token.expireIn || DEFAULT_TOKEN_EXPIRE,
      refreshToken,
    }
  }
