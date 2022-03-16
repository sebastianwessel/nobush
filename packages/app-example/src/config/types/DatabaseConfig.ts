import { ConnectionOptions } from 'typeorm'

import { LogLevelName } from './LogLevelName'

export type DatabaseConfig = {
  logLevel?: LogLevelName
  typeorm: ConnectionOptions
}
