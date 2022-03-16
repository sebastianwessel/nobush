import { getDefaultEventBridgeConfig } from '@nobush/core/src/config'

import { config } from './config'
import { EventBridgeConfig } from './types'

/**
 * Get the event bridge configuration from the config file
 * @returns An object with the following keys:
 */
export const getEventBridgeConfig = (): EventBridgeConfig => {
  let conf = getDefaultEventBridgeConfig()
  if (config['eventBridge']) {
    conf = { ...conf, ...(config['eventBridge'] as EventBridgeConfig) }
  }

  return conf
}
