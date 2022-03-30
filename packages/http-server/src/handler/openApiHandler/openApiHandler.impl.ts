import { OPENAPI_DEFAULT_INFO } from '../../config'
import { Handler } from '../../types'

export const openApiHandler: Handler = async function (_request, _response, context) {
  const paths: Record<string, unknown> = {}

  const info = this.config.openApi?.info || { info: OPENAPI_DEFAULT_INFO }

  const json = {
    openapi: '3.0.3',
    info,
    // servers,
    paths,
    //   components,
    //   security,
    tags: this.config.openApi?.tags,
    //    externalDocs,
  }

  this.routeDefinitions.forEach((entry) => {
    const definition = entry.expose.http
    paths[definition.path] = {
      [definition.method.toLowerCase()]: {
        responses: {
          200: {
            description: definition.openApi?.description,
            content: {
              [definition.contentType || 'application/json']: {
                schema: definition.openApi?.outputPayload,
              },
            },
          },
        },
      },
    }
  })

  context.payload = json

  return context
}
