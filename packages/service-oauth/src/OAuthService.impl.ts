import { EventBridge, Logger, Service } from '@nobush/core'

import { COMMANDS } from './commands'
import { getOAuthServiceDefaultOptions, getServiceInfo } from './config'
import { SUBSCRIPTIONS } from './subscriptions'
import { OAuthServiceOptions } from './types'

export class OAuthService extends Service {
  public options: OAuthServiceOptions = getOAuthServiceDefaultOptions()
  constructor(baseLogger: Logger, eventBridge: EventBridge) {
    super(baseLogger, getServiceInfo(), eventBridge, COMMANDS, SUBSCRIPTIONS)
  }

  static async createInstance(
    baseLogger: Logger,
    eventBridge: EventBridge,
    options: OAuthServiceOptions,
  ): Promise<OAuthService> {
    const instance = new OAuthService(baseLogger, eventBridge)
    instance.options = { ...getOAuthServiceDefaultOptions(), ...options }
    return instance
  }

  getAuthMiddleware() {}
}
