/* eslint-disable no-console */
import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

import { config } from './config'
import { Config } from './types'

let configDir = ''

/**
 * Get the directory where the configuration file is located
 */
export const getConfigDir = () => configDir

/**
 * It reads the configuration files from the configuration directory and parses them into the config
 * object
 * @param {string} dir - The directory where the configuration files are located.
 * @returns The config object.
 */
export const initConfigs = async (dir: string): Promise<Config> => {
  configDir = dir
  if (!existsSync(configDir)) {
    console.error('Invalid configuration directory')
    process.exit(1)
  }

  const files = readdirSync(configDir)

  files.forEach(function (file) {
    if (file.toLowerCase().endsWith('.json')) {
      const name = file.split('.')[0]
      const content = readFileSync(resolve(configDir, file)).toString()
      config[name] = JSON.parse(content)
    }
  })

  return config
}
