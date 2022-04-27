import { Logger } from '@nobush/core'

import { getConnection } from './getConnection'

export const runMigrations = async (log: Logger) => {
  log.info('Start running migrations')
  const connection = await getConnection()
  const migrations = await connection.runMigrations()
  migrations.forEach((migration) => {
    log.info(`Migration ${migration.name}`, migration)
  })
  log.info('Migrations are done')
}
