import { SubscriptionDefinition } from '@nobush/core'

import { getServiceCommandsToRestApi } from './ServiceCommandsToRestApi'

export const SUBSCRIPTIONS: SubscriptionDefinition[] = [getServiceCommandsToRestApi()]
