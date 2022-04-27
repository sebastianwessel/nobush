import { User } from '../entities'
import { getRepository } from '../helper'

export const getUserRepository = () => getRepository(User)
