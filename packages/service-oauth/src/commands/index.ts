import { CommandDefinition } from '@nobush/core'

import authenticate from './authenticate'
import generateToken from './generateToken'
import refreshToken from './refreshToken'
import verifyToken from './verifyToken'

export const COMMANDS: CommandDefinition<any, any>[] = [
  authenticate.getDefinition(),
  generateToken.getDefinition(),
  refreshToken.getDefinition(),
  verifyToken.getDefinition(),
]
