import { Http2ServerRequest, Http2ServerResponse } from 'http2'

import { Context } from './Context'

export type Handler = (request: Http2ServerRequest, response: Http2ServerResponse, context: Context) => Promise<Context>
