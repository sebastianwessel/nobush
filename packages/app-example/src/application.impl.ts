import { DefaultEventBridge, initLogger } from '@nobush/core'
import { createHelmetMiddleware, Handler, HttpServerService } from '@nobush/http-server'
import { getProxyMiddleware } from '@nobush/middleware-proxy'
import { createStaticFileMiddleware } from '@nobush/middleware-static'
import { OAuthService } from '@nobush/service-oauth'
import { Command } from 'commander'
import { resolve } from 'path'
import * as swaggerUi from 'swagger-ui-dist'

import packageJson from '../package.json'
import { getDatabaseConfig, getEventBridgeConfig, getGeneralConfig, getOauthConfig, initConfigs } from './config'
import { getHttpServerConfig } from './config/getHttpServerConfig.impl'
import { initDatabase, runMigrations } from './database'
// import { TestService } from './service/TestService'
import { UserService } from './service/User/UserService'

export const startApplication = async () => {
  const program = new Command()

  const nodeEnv = process.env.NODE_ENV || 'develop'

  const defaultConfigPath = resolve(__dirname, '../config', nodeEnv)
  const defaultPublicPath = resolve(__dirname, '../public')

  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)
    .option('-c, --config <path>', 'the path of your config file directory', defaultConfigPath)

  program.parse()

  const options = program.opts()

  await initConfigs(options.config)

  const { defaultLogLevel, applicationName, version } = getGeneralConfig()
  const baseLogger = initLogger(defaultLogLevel)

  baseLogger.info(`${applicationName} ${version}`)

  try {
    await initDatabase(getDatabaseConfig(), baseLogger)
    await runMigrations(baseLogger)
  } catch (error) {
    baseLogger.error('database not ready', error)
  }

  const eventBridge = new DefaultEventBridge(baseLogger, getEventBridgeConfig())

  const httpServerService = await HttpServerService.createInstance(baseLogger, eventBridge, getHttpServerConfig())
  httpServerService.addOnBeforeMiddleware(createHelmetMiddleware())

  const notFoundHandlers: Handler[] = [
    createStaticFileMiddleware({ path: defaultPublicPath }),
    getProxyMiddleware({
      logLevel: 'error',
      web: {
        rejectUnauthorized: false,
        protocol: 'https',
        hostname: '127.0.0.1',
        port: 7443,
      },
    }),
  ]

  httpServerService.setNotFoundHandlers(notFoundHandlers)

  const swaggerUiHandler = createStaticFileMiddleware({ path: swaggerUi.absolutePath(), removeStartingPath: '/api' })

  httpServerService.addRoute(
    'GET',
    '/api/*',
    async (_req, _res, context) => {
      return context
    },
    swaggerUiHandler,
  )

  await httpServerService.start()

  const oauthService = await OAuthService.createInstance(baseLogger, eventBridge, getOauthConfig())
  await oauthService.start()

  const userService = await UserService.createInstance(baseLogger, eventBridge)
  await userService.start()
}
