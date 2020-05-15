/**
 * Describes 404 error which is raised when user tries to get resource that does not exist.
 */
export class PageNotFoundError extends Error {
  /**
   * Creates instance of {@type PageNotFoundError}.
   * @param {string} message - error message.
   */
  constructor(message) {
    super();
    this.message = message;
  }
}
