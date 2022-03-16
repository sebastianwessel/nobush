import { ContentType } from './ContentType'

export type HttpExposedServiceMeta = {
  expose: {
    http: {
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
      path: string
      contentType?: ContentType // if not set we expect 'application/json'
      openApi?: {
        inputPayload?: string
        parameter?: string
        outputPayload?: string
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
