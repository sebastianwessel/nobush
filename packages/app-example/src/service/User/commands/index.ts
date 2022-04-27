import { CommandDefinition } from '@nobush/core'

import authenticate from './authenticate'
import deleteUserByUuid from './deleteUserByUuid'
import getUserByUuid from './getUserByUuid'
import getUsers from './getUsers'
import signUp from './signUp'

export const COMMANDS: CommandDefinition<any, any>[] = [
  authenticate.getDefinition(),
  signUp.getDefinition(),
  getUsers.getDefinition(),
  getUserByUuid.getDefinition(),
  deleteUserByUuid.getDefinition(),
]
