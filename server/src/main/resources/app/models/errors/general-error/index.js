/**
 * Represents general error.
 * <p>It can be one of 5** or 4** error types.
 */
export class GeneralError extends Error {
  /**
   * Error status.
   *
   * @type {number}
   */
  status;

  /**
   * Creates new general error.
   *
   * @param {number} status - error status.
   * @param {string} message - error message.
   */
  constructor(status, message) {
    super();
    this.status = status;
  }
}
