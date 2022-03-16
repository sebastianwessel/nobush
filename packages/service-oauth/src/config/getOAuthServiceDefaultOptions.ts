import { OAuthServiceOptions } from '../types'
import { DEFAULT_REFRESH_TOKEN_EXPIRE, DEFAULT_TOKEN_EXPIRE } from './defaultValues'

export const getOAuthServiceDefaultOptions = (): OAuthServiceOptions => {
  return {
    token: {
      algorithm: 'RS256',
      privateKey: '',
      publicKey: '',
      issuer: 'oauth:server',
      audience: 'user:access:token',
      expireIn: DEFAULT_TOKEN_EXPIRE,
    },
    refreshToken: {
      algorithm: 'RS256',
      privateKey: '',
      publicKey: '',
      issuer: 'oauth:server',
      audience: 'user:access:refresh:token',
      expireIn: DEFAULT_REFRESH_TOKEN_EXPIRE,
    },
  }
}
