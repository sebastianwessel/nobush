import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { config } from './config'
import { DatabaseConfig } from './types'

/**
 * This function returns a default database configuration
 * @returns A database configuration object.
 */
export const getDefaultDatabaseConfig = (): DatabaseConfig => {
  const defaultConfig: DatabaseConfig = {
    logLevel: 'error',
    typeorm: {
      type: 'better-sqlite3',
      database: 'database/example.sqlite',
      synchronize: true,
      logging: false,
      entities: ['src/database/entities/**/*.entity.ts'],
      migrations: ['src/database/migrations/**/*.migration.ts'],
      subscribers: ['src/subscribers/**/*.subscriber.ts'],
      namingStrategy: new SnakeNamingStrategy(),
    },
  }
  return defaultConfig
}

/**
 * Get the database configuration from the config file
 * @returns The database configuration object.
 */
export const getDatabaseConfig = (): DatabaseConfig => {
  const conf: DatabaseConfig = getDefaultDatabaseConfig()
  if (!config['database']) {
    return conf
  }

  const final: DatabaseConfig = {
    ...(config['database'] as DatabaseConfig),
  }
  final.typeorm = {
    ...final.typeorm,
    entities: conf.typeorm.entities,
    migrations: conf.typeorm.migrations,
    subscribers: conf.typeorm.subscribers,
    namingStrategy: conf.typeorm.namingStrategy,
    synchronize: conf.typeorm.synchronize,
  }

  return final
}
