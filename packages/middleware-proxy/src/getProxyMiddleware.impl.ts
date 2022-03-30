import { LogLevelName } from '@nobush/core'
import { Context, Middleware } from '@nobush/http-server'
import { IncomingMessage, ServerResponse } from 'http'
import proxy from 'http2-proxy'

export type ProxyMiddlewareOptions = {
  logLevel?: LogLevelName
  web: {
    rejectUnauthorized?: boolean
    protocol: 'https' | 'http'
    hostname: string
    port: number
    timeout?: number
  }
}

/**
 * Returns a default configuration for the proxy middleware
 * @returns A configuration object with the default values for the proxy middleware.
 */
export const getDefaultProxyMiddlewareOptions = (): ProxyMiddlewareOptions => {
  const defaultConfig: ProxyMiddlewareOptions = {
    web: {
      protocol: 'https',
      hostname: '127.0.0.1',
      port: 7443,
      timeout: 1000,
    },
  }

  return defaultConfig
}

/**
 * It creates a proxy middleware that will forward requests to the specified URL
 * @param options - An object containing the following properties:
 * @returns A middleware function that will be used by the Koa server.
 */
export const getProxyMiddleware = (options = getDefaultProxyMiddlewareOptions()): Middleware => {
  const config = { ...getDefaultProxyMiddlewareOptions(), ...options }

  const proxyMiddleware: Middleware = async function (request, response, context) {
    return new Promise<Context>((resolve, reject) => {
      proxy.web(
        request as unknown as IncomingMessage,
        response as unknown as ServerResponse,
        config.web,
        (err, _req, _res) => {
          if (err) {
            this.log.error(err)
            reject(err)
          }
          context.isResponseSend = true
          resolve(context)
        },
      )
    })
  }
  return proxyMiddleware
}
