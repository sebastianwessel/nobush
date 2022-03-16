import { EBMessage } from '../EBMessage'
import { EBMessageType } from '../EBMessageType.enum'
import { SubscriptionId } from './SubscriptionId'

export type SubscriptionDefinition = {
  subscriptionName: string
  subscriptionDescription: string
  call(subscriptionId: SubscriptionId, message: EBMessage): Promise<void>
  sender?: {
    serviceName?: string
    serviceVersion?: string
    serviceTarget?: string
  }
  receiver?: {
    serviceName?: string
    serviceVersion?: string
    serviceTarget?: string
  }
  messageTypes?: EBMessageType[]
}
