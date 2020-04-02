import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {GeneralServerError} from '../models/errors/server-error';
import {AuthenticationError} from '../models/errors/authentication-error';

export class ApiService {
  static service = new ApiService();

  /**
   * Tries to authenticate user and returns result of authentication.
   *
   * @param {UserCredentials} userCredentials - user`s login form credentials.
   * @return {Promise} result of login.
   */
  login(userCredentials) {
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      let errorMessage;
      response.json().then((error) => errorMessage = error.message);
      throw new AuthenticationError(errorMessage);
    });
  }

  /**
   * Tries to register new user and returns result of registration.
   *
   * @param {UserCredentials} userCredentials - user`s registration form credentials.
   * @return {Promise} result of registration.
   */
  register(userCredentials) {
    return fetch('/register', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 422) {
        let serverResponse;
        response.json()
          .then((responseObject) => serverResponse = responseObject);
        throw new ValidationError(serverResponse);
      }
    });
  }

  /**
   * @return {ApiService} singleton.
   */
  static getInstance() {
    return this.service;
  }
}
