import { generateSchema } from '@anatine/zod-openapi'
import { CommandDefinition, CommandFunction, Service } from '@nobush/core'
import { HttpExposedServiceMeta } from '@nobush/http-server'
import { z } from 'zod'

import { getFunctionWithValidation } from './getFunctionWithValidation'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export class FunctionDefinitionBuilder<
  ServiceClassType extends Service,
  PayloadType = unknown,
  ParamsType = unknown,
  ResultType = unknown,
> {
  private httpMetadata: HttpExposedServiceMeta | undefined
  private inputSchema: z.ZodType<PayloadType> | undefined
  private outputSchema: z.ZodType<ResultType> | undefined
  private paramsSchema: z.ZodType<ParamsType> | undefined

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private commandName: string,
    private commandDescription = '',
    private fn: CommandFunction<ServiceClassType, PayloadType, ParamsType, ResultType>,
  ) {}

  addInputSchema(inputSchema: z.ZodType<PayloadType>) {
    this.inputSchema = inputSchema
    return this
  }

  addOutputSchema(outputSchema: z.ZodType<ResultType>) {
    this.outputSchema = outputSchema
    return this
  }

  addParameterSchema(paramsSchema: z.ZodType<ParamsType>) {
    this.paramsSchema = paramsSchema
    return this
  }

  exposeAsHttpEndpoint(method: HttpMethod, path: string, contentType?: string) {
    this.httpMetadata = {
      expose: {
        http: {
          method,
          path,
          contentType,
        },
      },
    }
    return this
  }

  private extendWithHttpMetadata(
    definition: CommandDefinition<
      HttpExposedServiceMeta,
      CommandFunction<ServiceClassType, PayloadType, ParamsType, ResultType>
    >,
  ) {
    if (!this.httpMetadata) {
      return definition
    }

    definition.metadata.expose = {
      ...(definition.metadata.expose || {}),
      ...this.httpMetadata.expose,
    }

    definition.metadata.expose.http.openApi = {
      inputPayload: this.inputSchema ? generateSchema(this.inputSchema).toString() : undefined,
      parameter: this.paramsSchema ? generateSchema(this.paramsSchema).toString() : undefined,
      outputPayload: this.outputSchema ? generateSchema(this.outputSchema).toString() : undefined,
    }

    return definition
  }

  getDefinition(): CommandDefinition<unknown, CommandFunction<ServiceClassType, PayloadType, ParamsType, ResultType>> {
    let definition: CommandDefinition<
      unknown,
      CommandFunction<ServiceClassType, PayloadType, ParamsType, ResultType>
    > = {
      commandName: this.commandName,
      commandDescription: this.commandDescription,
      metadata: {},
      call: getFunctionWithValidation<ServiceClassType, PayloadType, ParamsType, ResultType>(
        this.fn,
        this.inputSchema,
        this.paramsSchema,
        this.outputSchema,
      ),
    }

    definition = this.extendWithHttpMetadata(
      definition as CommandDefinition<
        HttpExposedServiceMeta,
        CommandFunction<ServiceClassType, PayloadType, ParamsType, ResultType>
      >,
    )

    return definition
  }
}