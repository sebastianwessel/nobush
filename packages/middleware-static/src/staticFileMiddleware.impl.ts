import { ErrorCode, HandledError } from '@nobush/core'
import { CompressionMethod, getCompressionMethod, getCompressionStream } from '@nobush/helper'
import { ContentType, Context, Middleware } from '@nobush/http-server'
import { createReadStream } from 'fs'
import { lstat } from 'fs/promises'
import { contentType, lookup } from 'mime-types'
import { extname, join } from 'path'

export type StaticFileMiddlewareOptions = {
  path: string
  gzipMimeTypes?: ContentType[]
}

/**
 * It returns a default configuration for the static file middleware.
 * @returns A middleware function that can be used in the http server.
 */
export const getDefaultStaticFileMiddlewareOptions = (): StaticFileMiddlewareOptions => {
  const defaultConfig = {
    path: '../public',
    gzipMimeTypes: [
      'application/json',
      'application/javascript',
      'text/csv',
      'text/css',
      'text/html',
      'text/javascript',
      'text/markdown',
      'text/plain',
    ],
  }
  return defaultConfig
}

export const createStaticFileMiddleware = (options = getDefaultStaticFileMiddlewareOptions()): Middleware => {
  const config = { ...getDefaultStaticFileMiddlewareOptions(), ...options }

  const staticFileMiddleware: Middleware = async (request, response, context) => {
    if (request.method !== 'GET') {
      return context
    }

    const url = new URL(request.url, 'https://example.org/')
    const reqPath = url.pathname

    let filePath = join(config.path, reqPath)

    let compressionMethod: CompressionMethod

    // get file info and try to use index.html on directory
    try {
      let info = await lstat(filePath)
      if (info.isDirectory()) {
        filePath = join(filePath, 'index.html')
      }
      info = await lstat(filePath)
      if (!info.isFile()) {
        return context
      }

      compressionMethod = getCompressionMethod(request.headers, info.size)
    } catch (err) {
      return context
    }

    const result = new Promise<Context>((resolve, reject) => {
      const mimeType = lookup(filePath)
      const responseContentType = contentType(extname(filePath))
      const readStream = createReadStream(filePath)

      readStream.on('open', () => {
        if (responseContentType) {
          response.setHeader('content-type', responseContentType)
        }

        const stream = getCompressionStream(compressionMethod)
        if (stream && mimeType && config.gzipMimeTypes?.includes(mimeType)) {
          response.setHeader('content-encoding', 'gzip')
          readStream.pipe(stream).pipe(response)
        } else {
          readStream.pipe(response)
        }
      })

      readStream.on('error', (err: Error & { code?: string }) => {
        if (err.code === 'ENOENT') {
          resolve(context)
        } else {
          context.log.error(err)
          reject(new HandledError(ErrorCode.InternalServerError))
        }
      })

      readStream.on('end', () => {
        context.isResponseSend = true
        resolve(context)
      })
    })

    return result
  }

  return staticFileMiddleware
}
