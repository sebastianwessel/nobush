import { getOAuthServiceDefaultOptions, OAuthServiceOptions } from '@nobush/service-oauth'

import { getFileContent } from '../helper'
import { config } from './config'

/**
 * It gets the configuration for the HTTP server.
 * @returns A list of files to be deleted
 */
export const getOauthConfig = (): OAuthServiceOptions => {
  let conf = getOAuthServiceDefaultOptions()
  if (config['oauthService']) {
    conf = { ...conf, ...(config['oauthService'] as OAuthServiceOptions) }
  }

  if (conf.token.privateKey) {
    conf.token.privateKey = getFileContent(conf.token.privateKey.toString())
  }
  if (conf.token.publicKey) {
    conf.token.publicKey = getFileContent(conf.token.publicKey.toString())
  }

  if (conf.refreshToken.privateKey) {
    conf.refreshToken.privateKey = getFileContent(conf.refreshToken.privateKey.toString())
  }
  if (conf.refreshToken.publicKey) {
    conf.refreshToken.publicKey = getFileContent(conf.refreshToken.publicKey.toString())
  }

  return conf
}
