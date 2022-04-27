import { ObjectType } from 'typeorm'

import { getConnection } from './getConnection'

export const getRepository = async <Entity>(entity: ObjectType<Entity>) => {
  const connection = await getConnection()
  return connection.getRepository(entity)
}
