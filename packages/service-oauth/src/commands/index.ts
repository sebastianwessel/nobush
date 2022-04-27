import { CommandDefinition } from '@nobush/core'

import generateToken from './generateToken'
import refreshToken from './refreshToken'
import verifyToken from './verifyToken'

export const COMMANDS: CommandDefinition<any, any>[] = [
  generateToken.getDefinition(),
  refreshToken.getDefinition(),
  verifyToken.getDefinition(),
]
