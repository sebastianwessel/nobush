import { SubscriptionDefinition } from '@nobush/core'

import sendVerificationEmail from './sendVerificationEmail'

export const SUBSCRIPTIONS: SubscriptionDefinition[] = [sendVerificationEmail.getDefinition()]
