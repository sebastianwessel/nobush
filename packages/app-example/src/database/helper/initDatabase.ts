import { Logger } from '@nobush/core'
import { getConnectionManager } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'

import { DatabaseConfig } from '../../config/types'

export const initDatabase = async (config: DatabaseConfig, baseLogger: Logger) => {
  const log = baseLogger.getChildLogger({ name: 'database', minLevel: config.logLevel })

  log.debug('init database')

  const dbConf = config.typeorm as BetterSqlite3ConnectionOptions

  const connectionManager = getConnectionManager()
  const connection = connectionManager.create({ ...dbConf })
  await connection.connect() // performs connection
  log.debug('database done')
}
