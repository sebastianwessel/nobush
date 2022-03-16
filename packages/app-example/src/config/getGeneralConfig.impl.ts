import packageJson from '../../package.json'
import { config } from './config'
import { GeneralConfig } from './types'

/**
 * It returns a default configuration object
 * @returns A default configuration object.
 */
const defaultGeneralConfig = (): GeneralConfig => {
  const defaultConfig: GeneralConfig = {
    applicationName: packageJson.name,
    version: packageJson.version,
    defaultLogLevel: 'debug',
  }
  return defaultConfig
}

/**
 * It returns the default general config, and then it merges the config from the config file with the
 * default general config.
 * @returns A new object with the default values for the general config and the values from the config
 * file.
 */
export const getGeneralConfig = (): GeneralConfig => {
  let conf = defaultGeneralConfig()
  if (config['general']) {
    conf = { ...conf, ...(config['general'] as GeneralConfig) }
  }
  return conf
}
