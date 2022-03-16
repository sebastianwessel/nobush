import { EBMessage, SubscriptionCallback } from '@nobush/core'

import { HttpServerService } from '../HttpServerService.impl'

export type HttpServiceSubscriptionCallBack<MessageType = EBMessage> = SubscriptionCallback<
  HttpServerService,
  MessageType
>
