import { ContentType } from './ContentType'

export type HttpExposedServiceMeta = {
  expose: {
    http: {
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
      path: string
      contentType?: ContentType // if not set we expect 'application/json'
      openApi?: {
        description: string
        tags?: string[]
        inputPayload?: unknown
        parameter?: unknown
        outputPayload?: unknown
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
