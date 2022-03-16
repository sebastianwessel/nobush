import { readFileSync } from 'fs'
import { resolve } from 'path'

import { getConfigDir } from '../config'

/**
 * It takes a file path and returns the contents of that file
 * @param {string} file - The file to read.
 * @returns A string.
 */
export const getFileContent = (file: string): string => {
  const filePath = resolve(getConfigDir(), file)
  return readFileSync(filePath).toString()
}
