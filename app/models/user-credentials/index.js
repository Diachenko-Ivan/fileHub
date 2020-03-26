/**
 * Stores user`s login and password.
 */
export class UserCredentials {
  /**
   * User`s login.
   *
   * @type {string}
   */
  login;
  /**
   * User`s password.
   *
   * @type {string}
   */
  password;

  /**
   * Create new {@type UserCredentials} instance.
   *
   * @param login - user`s login.
   * @param password - user`s password.
   */
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
}
