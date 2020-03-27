/**
 * Describes form field and appropriate error from server.
 */
export class ValidationErrorCase {
  /**
   * @typedef ErrorCase
   * @property {string} field - 'login' or 'password'.
   * @property {string} message - error validation message.
   */

  /**
   * Creates new {@type ValidationErrorCase} instance.
   *
   * @param {ErrorCase} errorCase - object with credential field and bound error message.
   */
  constructor(errorCase) {
    this.field = errorCase.field;
    this.message = errorCase.message;
  }
}
