import { getErrorMessageForCode } from './helper'
import { CommandErrorResponse, ErrorCode, ErrorResponse } from './types'

/**
 * A handled error is an error which is handled or thrown by business logic.
 * It is wanted to expose it the outside world.
 * Scenarios are input validation failures or "404 Not Found" errors which should be returned to the caller.
 */
export class HandledError extends Error {
  constructor(public errorCode: ErrorCode, message?: string, public data?: unknown) {
    super(message || getErrorMessageForCode(errorCode))
  }

  /**
   * Create a error object from EBMessage error message
   * @param message CommandErrorResponse
   * @returns HandledError
   */
  static fromMessage(message: CommandErrorResponse): HandledError {
    const error = new HandledError(message.response.status, message.response.message, message.response.data)
    return error
  }

  /**
   * Returns error response object
   * @returns ErrorResponse
   */
  getErrorResponse() {
    const errorResponse: ErrorResponse = {
      status: this.errorCode,
      message: this.message,
      data: this.data,
    }

    return errorResponse
  }

  /**
   * Returns stringified error response object
   * @returns ErrorResponse as string
   */
  toString() {
    return JSON.stringify(this.getErrorResponse())
  }
}
