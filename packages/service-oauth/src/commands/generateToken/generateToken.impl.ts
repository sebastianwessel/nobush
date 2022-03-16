import { CommandFunction, getUniqueId } from '@nobush/core'
import { sign } from 'jsonwebtoken'

import { DEFAULT_TOKEN_EXPIRE } from '../../config'
import { OAuthService } from '../../OAuthService.impl'
import { InputParameterType, InputPayloadType, OutputPayloadType } from './schema'

export const generateToken: CommandFunction<OAuthService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, _parameter) {
    this.log.debug('generate token function called')

    const token = await new Promise<string>((resolve, reject) => {
      sign(
        {},
        this.options.token.publicKey,
        {
          audience: this.options.token.audience,
          issuer: this.options.token.issuer,
          subject: payload.userId,
          expiresIn: this.options.token.expireIn,
        },
        (err, payload) => {
          if (err) {
            return reject(err)
          }
          if (!payload) {
            return reject(new Error('failed to generate token'))
          }
          resolve(payload)
        },
      )
    })

    const jwtid = getUniqueId()

    const refreshToken = await new Promise<string>((resolve, reject) => {
      sign(
        {
          generated: new Date().toISOString(),
          _id: getUniqueId(),
        },
        this.options.token.publicKey,
        {
          audience: this.options.refreshToken.audience,
          issuer: this.options.refreshToken.issuer,
          expiresIn: this.options.refreshToken.expireIn,
          jwtid,
        },
        (err, payload) => {
          if (err) {
            return reject(err)
          }
          if (!payload) {
            return reject(new Error('failed to generate refresh token'))
          }
          resolve(payload)
        },
      )
    })

    return {
      token,
      refreshToken,
      expiresIn: this.options.token.expireIn || DEFAULT_TOKEN_EXPIRE,
    }
  }
