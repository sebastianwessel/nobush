import { getDefaultConfig, HttpServerConfig } from '@nobush/http-server'

import { getFileContent } from '../helper'
import { config } from './config'

/**
 * It gets the configuration for the HTTP server.
 * @returns A list of files to be deleted
 */
export const getHttpServerConfig = (): HttpServerConfig => {
  let conf = getDefaultConfig()
  if (config['httpServerService']) {
    conf = { ...conf, ...(config['httpServerService'] as HttpServerConfig) }
  }

  if (conf.options.key) {
    conf.options.key = getFileContent(conf.options.key.toString())
  }
  if (conf.options.cert) {
    conf.options.cert = getFileContent(conf.options.cert.toString())
  }

  return conf
}
