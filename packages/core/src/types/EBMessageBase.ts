import { EBMessageId } from './EBMessageId'
import { TraceId } from './TraceId'

export type EBMessageBase = {
  id: EBMessageId
  traceId?: TraceId
  timestamp: number
}
