import { EBMessageType, SubscriptionDefinition } from '@nobush/core'

import { serviceCommandsToRestApi } from './serviceCommandsToRestApi.impl'

/**
 * This function listens for messages of type `InfoServiceFunctionAdded` and calls the
 * `serviceCommandsToRestApi` function
 * @returns A subscription definition.
 */
export const getServiceCommandsToRestApi = (): SubscriptionDefinition => {
  const subscription: SubscriptionDefinition = {
    subscriptionName: 'AddServiceCommandSubscription',
    subscriptionDescription:
      'subscription which listens for infos about commands from services which should be exposed as rest api endpoints',
    call: serviceCommandsToRestApi,
    messageTypes: [EBMessageType.InfoServiceFunctionAdded],
  }

  return subscription
}
