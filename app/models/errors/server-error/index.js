/**
 * Represents general server that is come from server.
 */
export class GeneralServerError {
  /**
   * Server error message.
   *
   * @type {string}
   */
  message;

  /**
   * Creates new server error.
   *
   * @param {string} message - error message.
   */
  constructor(message) {
    this.message = message;
  }
}
