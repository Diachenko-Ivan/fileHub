/**
 * Describes authentication error which is raised when user tries to log in.
 */
export class FileItemNotFoundError extends Error {
  /**
   * Creates instance of {@type FileItemNotFoundError}.
   * @param {string} message - error message.
   */
  constructor(message) {
    super();
    this.message = message;
  }
}
