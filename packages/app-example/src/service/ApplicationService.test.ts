import {
  CommandDefinition,
  getEventBridgeMock,
  getLoggerMock,
  ServiceInfoType,
  SubscriptionDefinition,
} from '@nobush/core'

import { ApplicationService } from './ApplicationService.impl'

test('creates a and destroys application service class', () => {
  const log = getLoggerMock()
  const serviceInfo: ServiceInfoType = {} as ServiceInfoType
  const eventBridge = getEventBridgeMock()
  const commands: CommandDefinition[] = []
  const subscriptions: SubscriptionDefinition[] = []

  const instance = new ApplicationService(log, serviceInfo, eventBridge.mock, commands, subscriptions)

  expect(instance).toBeInstanceOf(ApplicationService)

  expect(instance.destroy()).resolves.toBeUndefined()
})
