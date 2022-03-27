import { Handler, Middleware } from '../../types'

export type ResponseToJsonMiddlewareOptions = {}

/**
 * It returns a default configuration for the ResponseToJsonMiddlewareOptions.
 * @returns A middleware function.
 */
export const getDefaultResponseToJsonMiddlewareOptions = (): ResponseToJsonMiddlewareOptions => {
  const defaultConfig: ResponseToJsonMiddlewareOptions = {}
  return defaultConfig
}

/**
 * If the response is not a JSON string, then convert it to a JSON string
 * @param options - An object that contains the following properties:
 * @returns A middleware function.
 */
export const createResponseToJsonMiddleware = (options = getDefaultResponseToJsonMiddlewareOptions()): Middleware => {
  const _config = { ...getDefaultResponseToJsonMiddlewareOptions(), ...options }

  const responseToJsonMiddleware: Handler = async (request, response, context) => {
    if (!context.payload || context.payload === '') {
      if (context.statusCode === 200) {
        context.statusCode = 204
      }
      return context
    }

    if (context.headers['content-type'] && context.headers['content-type'] === 'application/json; charset=utf-8') {
      return context
    }

    context.headers['content-type'] = 'application/json; charset=utf-8'

    if (typeof context.payload !== 'string') {
      context.payload = JSON.stringify(context.payload)
    }

    return context
  }
  return responseToJsonMiddleware
}
