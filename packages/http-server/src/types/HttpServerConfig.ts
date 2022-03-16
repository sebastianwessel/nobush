import { LogLevelName } from '@nobush/core'
import { SecureServerOptions } from 'http2'

export type HttpServerConfig = {
  logLevel?: LogLevelName
  port: number
  options: SecureServerOptions
}
