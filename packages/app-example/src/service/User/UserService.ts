import { EventBridge, Logger } from '@nobush/core'

import { ApplicationService } from '../ApplicationService.impl'
import { COMMANDS } from './commands'
import { SERVICE_INFO } from './config'
import { SUBSCRIPTIONS } from './subscriptions'

export class UserService extends ApplicationService {
  constructor(baseLogger: Logger, eventBridge: EventBridge) {
    super(baseLogger, SERVICE_INFO, eventBridge, COMMANDS, SUBSCRIPTIONS)
  }

  static async createInstance(baseLogger: Logger, eventBridge: EventBridge): Promise<UserService> {
    const instance = new UserService(baseLogger, eventBridge)
    return instance
  }
}
