import { Logger } from '@nobush/core'
import pg from 'pg'
import { getConnectionManager } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { DatabaseConfig } from '../config/types'

export const initDatabase = async (config: DatabaseConfig, baseLogger: Logger) => {
  const log = baseLogger.getChildLogger({ name: 'database', minLevel: config.logLevel })

  log.debug('init database')
  // see: https://stackoverflow.com/questions/39168501/pg-promise-returns-integers-as-strings
  pg.types.setTypeParser(pg.types.builtins.INT8, parseInt)
  pg.types.setTypeParser(20, parseInt)

  const poolErrorHandler = (error: Error) => log.error(error)

  const dbConf = config.typeorm as PostgresConnectionOptions

  const connectionManager = getConnectionManager()
  const connection = connectionManager.create({ ...dbConf, poolErrorHandler })
  await connection.connect() // performs connection
  log.debug('database done')
}
