import { HttpServerConfig } from '../types'

export const getDefaultConfig = (): HttpServerConfig => {
  const defaultConfig: HttpServerConfig = {
    port: 9090,
    logLevel: 'warn',
    options: {
      ca: 'certs/ca.crt',
      key: 'certs/server.key',
      cert: 'certs/server.crt',
    },
  }
  return defaultConfig
}
