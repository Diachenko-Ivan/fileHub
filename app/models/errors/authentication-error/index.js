/**
 * Describes authentication error which is raised when user tries to log in.
 */
export class AuthenticationError extends Error {
  /**
   * Creates instance of {@type AuthenticationError}.
   * @param message
   */
  constructor(message) {
    super();
    this.message = message;
  }
}
