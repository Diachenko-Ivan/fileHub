/**
 * Plays role of validation error thad is sent from server.
 */
export class ValidationError {
  /**
   * Stores validation errors from server.
   *
   * @example
   * {
   *   field: 'login',
   *   message: 'User with this login already registered.'
   * }
   *
   * @type {ValidationErrorCase[]}
   */
  errors = [];

  /**
   *
   * @param {object} serverResponse - stores results of server response.
   */
  constructor(serverResponse) {
    this.errors = serverResponse.errors;
  }
}
