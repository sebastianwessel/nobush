import { LogLevelName } from '@nobush/core'
import { SecureServerOptions } from 'http2'

export type HttpServerConfig = {
  logLevel?: LogLevelName
  port: number
  options: SecureServerOptions
  openApi?: {
    enabled?: boolean
    path?: string
    info: {
      title?: string
      description?: string
      termsOfService?: string
      contact?: {
        name?: string
        url?: string
        email?: string
      }
      license?: {
        name: string
        url: string
      }
      version?: string
    }
    tags?: string[]
  }
}
