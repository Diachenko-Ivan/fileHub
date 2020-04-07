import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {GeneralServerError} from '../models/errors/server-error';
import {AuthenticationError} from '../models/errors/authentication-error';

/**
 * Used for fulfilling requests to server.
 */
export class ApiService {
  /**
   * Only copy of ApiService that is available on each page.
   *
   * @type {ApiService}
   */
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
        response.json()
          .then((data) => localStorage.setItem('token', data.token));
        return 'Successfully authenticated.';
      } else if (response.status === 401) {
        throw new AuthenticationError('No users found with this login and password.');
      } else if (response.status === 500) {
        throw new GeneralServerError('Server error!');
      }
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
        return 'Successfully registered.';
      } else if (response.status === 422) {
        return response.json()
          .then((responseObject) => {
            throw new ValidationError(responseObject);
          });
      } else if (response.status === 500) {
        throw new GeneralServerError('Server error!');
      }
    });
  }

  /**
   * Tries to get full file item list.
   *
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFileItemList() {
    return fetch('/file-list', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        window.location.hash = '/login';
      } else if (response.status === 500) {
        throw new GeneralServerError('Server error!');
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
