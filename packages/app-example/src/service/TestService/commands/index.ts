import { CommandDefinition } from '@nobush/core'

import testFunction from './testFunction'
import testGet from './testGet'

export const COMMANDS: CommandDefinition<any, any>[] = [testFunction.getDefinition(), testGet.getDefinition()]
