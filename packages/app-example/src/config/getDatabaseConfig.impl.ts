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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'example',
      synchronize: false,
      logging: false,
      entities: ['src/entities/**/*.ts'],
      migrations: ['src/migrations/**/*.ts'],
      subscribers: ['src/subscribers/**/*.ts'],
    },
  }
  return defaultConfig
}

/**
 * Get the database configuration from the config file
 * @returns The database configuration object.
 */
export const getDatabaseConfig = (): DatabaseConfig => {
  let conf: DatabaseConfig = getDefaultDatabaseConfig()
  if (config['database']) {
    conf = { ...conf, ...(config['database'] as DatabaseConfig) }
  }

  return conf
}
