import type { SchemaObject } from 'openapi3-ts'

import { ContentType } from './ContentType'
import { QueryParameter } from './QueryParameter'

export type HttpExposedServiceMeta = {
  expose: {
    http: {
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
      path: string
      contentType?: ContentType // if not set we expect 'application/json'
      openApi?: {
        description: string
        summary: string
        tags?: string[]
        inputPayload?: SchemaObject
        parameter?: SchemaObject
        query?: QueryParameter[]
        outputPayload?: SchemaObject
      }
    }
  }
}

export const isHttpExposedServiceMeta = (data?: unknown): data is HttpExposedServiceMeta => {
  if (!data || typeof data !== 'object') {
    return false
  }
  if (!Object.prototype.hasOwnProperty.call(data, 'expose')) {
    return false
  }
  return true
}
