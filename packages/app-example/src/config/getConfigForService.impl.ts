/* eslint-disable no-console */
import { ServiceInfoType } from '@nobush/core'

import { config } from './config'

/**
 * If there is a config for the service, return it. If there is a config for the service version,
 * return it. If there is a config for the service name, return it. Otherwise, return the default
 * config
 * @param {ServiceInfoType} metadata - ServiceInfoType
 * @param {T} defaultConfig - The default configuration for the service.
 * @returns A new object with the default config merged with the config for the service.
 */
export const getConfigForService = <T>(metadata: ServiceInfoType, defaultConfig: T): T => {
  const version = metadata.serviceVersion.replaceAll('.', '_')
  const name = metadata.serviceName
  if (config[`${name}_${version}`]) {
    return {
      ...defaultConfig,
      ...(config[`${name}_${version}`] as T),
    }
  }
  if (config[name]) {
    return {
      ...defaultConfig,
      ...(config[name] as T),
    }
  }
  console.warn(`config for ${name} ${version} not found`, Object.keys(config))
  return defaultConfig
}
