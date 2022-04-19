import { LogLevelName } from '@nobush/core'
import { SecureServerOptions } from 'http2'
import type {
  ComponentsObject,
  ExternalDocumentationObject,
  InfoObject,
  SecurityRequirementObject,
  ServerObject,
  TagObject,
} from 'openapi3-ts'

export type HttpServerConfig = {
  logLevel?: LogLevelName
  port: number
  options: SecureServerOptions
  apiMountPath?: string
  openApi?: {
    enabled?: boolean
    path?: string
    info: InfoObject
    servers?: ServerObject[]
    components?: ComponentsObject
    security?: SecurityRequirementObject[]
    externalDocs?: ExternalDocumentationObject
    tags?: TagObject[]
  }
}
