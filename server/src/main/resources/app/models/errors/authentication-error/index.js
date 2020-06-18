/**
 * Describes authentication error which is raised when user tries to log in.
 */
export class AuthenticationError extends Error {
  /**
   * Creates instance of {@type AuthenticationError}.
   *
   * @param {string} message - error message after authentication.
   */
  constructor(message) {
    super();
    this.message = message;
  }
}
