# BoBuSh

## Quick-Intro

The main concept behind this framework:  
Use some kind of event bridge or event bus or however you wanna call it, to build your software.

Communication between different functions, services, api's and so on are done via this event bridge.  

You have:

### EventBridge

The event bridge routes the messages from the send to the receiver.  
The event bridge also handles subscriptions and routes messages which are matching the subscriber.

### Commands

Commands are event bridge messages which are send from a sender to a specified receiver.  
The sender expects a response from the receiver, after the receiver processed the command.

### Subscriptions

Subscriptions are the more powerfull version of js event listeners.  
You can specify something like:
"Listen for all responses of function _createEntity_ of Service _MyService_ with version _1.0.0_".

### Services

A service reflects a single domain.  
They are identified by a service name and a service version.
A service can provide command-functions and start subscriptions.

## Example

Create your base app:

```typescript

const eventBridge = new DefaultEventBridge(baseLogger, getEventBridgeConfig())

  const httpServerService = await HttpServerService.createInstance(baseLogger, eventBridge, getHttpServerConfig())
  httpServerService.addOnBeforeMiddleware(createHelmetMiddleware())

await httpServerService.start()

const myService = await MyService.createInstance(baseLogger, eventBridge)
  await myService.start()

```

Create a Service:

```typescript
export class MyService extends Service {
  constructor(baseLogger: Logger, eventBridge: EventBridge) {
    super(baseLogger, SERVICE_INFO, eventBridge, COMMANDS, SUBSCRIPTIONS)
  }
}
```

Create service function:

```typescript
export const testFunction: CommandFunction<TestService, InputPayloadType, InputParameterType, OutputPayloadType> =
  async function (payload, parameter) {
    this.log.debug('test function called')
    return {
      my: {
        payload,
        parameter,
      },
    }
  }
```

Create a definition for the function

```typescript
export const builder = new FunctionDefinitionBuilder('testFunction', 'some simple test function', testFunction)
  .addInputSchema(inputPayloadSchema)
  .addParameterSchema(inputParameterSchema)
  .addOutputSchema(outputPayloadSchema)
  .exposeAsHttpEndpoint('POST', '/test/:id')
```

see [App Example](packages/app-example) or [Service OAuth](packages/service-oauth) for more code and details
