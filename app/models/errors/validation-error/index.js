import {ValidationErrorCase} from '../validation-error-case';

/**
 * Plays role of validation error thad is sent from server.
 */
export class ValidationError extends Error{
  /**
   * @typedef ServerResponse
   * @property {object:{field:string, message:string}[]} errors - validation errors from server.
   * @property {number} status - server response code.
   */
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
    super();
    this.errors = serverResponse.errors
      .map((error) => new ValidationErrorCase(error));
  }
}
