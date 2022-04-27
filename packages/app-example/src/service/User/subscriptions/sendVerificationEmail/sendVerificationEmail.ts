import { CommandSuccessResponse, SubscriptionCallback } from '@nobush/core'

import type { OutputPayloadType as UserCreatedResponse } from '../../commands/signUp/schema'
import type { UserService } from '../../UserService'

export const sendVerificationEmail: SubscriptionCallback<
  UserService,
  CommandSuccessResponse<UserCreatedResponse>
> = async function (_subscriptionId, message) {
  this.log.debug('sending verification email to user', message.response.uuid)
}
