# Http server

## Middleware

Middleware to be used before the request is processed by business logic:

- extractPayloadMiddleware extracts body content from POST, PATCH, and PUT requests
- requestBodyToJsonMiddleware converts the payload from JSON-string into js object

Middleware to be used after the request is processed by business logic:

- responseToJsonMiddleware converts response js object into JSON-string
- compressionMiddleware compresses the response with brotli or gzip or deflat depending on response size and client

## Handler

- internalError500Handler is used as response handler if any unhandled error is thrown during request
- notFound404Handler is used for requests which have no matching route entry
- proxy is used for scenarios where you want to proxy requests to other backends
