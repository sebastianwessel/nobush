import { EBMessageType } from '@nobush/core'
import { SubscriptionDefinitionBuilder } from '@nobush/helper'

import { SERVICE_INFO } from '../../config'
import { UserServiceFunction } from '../../types'
import { sendVerificationEmail } from './sendVerificationEmail'

export default new SubscriptionDefinitionBuilder(
  'emailVerificationSubscription',
  'listen for new user and send email verification',
  sendVerificationEmail,
)
  .sendFrom(SERVICE_INFO.serviceName, SERVICE_INFO.serviceVersion, UserServiceFunction.SignUp)
  .addMessageTypes(EBMessageType.CommandSuccessResponse)
