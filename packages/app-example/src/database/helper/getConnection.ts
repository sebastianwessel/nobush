import { createConnection, getConnection as getDbConnection } from 'typeorm'

export const getConnection = () => {
  return createConnection()
    .catch((err: Error) => {
      if (err.name.includes('AlreadyHasActiveConnectionError')) {
        return
      }
      throw err
    })
    .then(() => getDbConnection())
}
