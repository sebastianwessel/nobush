import { QueryFailedError } from 'typeorm'

export const isConstraintError = (err: unknown) => {
  if (err instanceof QueryFailedError) {
    if (err.driverError?.code?.includes('CONSTRAINT_UNIQUE')) {
      return true
    }
  }
  return false
}
