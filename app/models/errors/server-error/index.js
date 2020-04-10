/**
 * Represents general server that is come from server.
 */
export class GeneralServerError extends Error {
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
    super();
    this.message = message;
  }
}
