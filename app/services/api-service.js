import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {GeneralServerError} from '../models/errors/server-error';
import {AuthenticationError} from '../models/errors/authentication-error';
import {StorageService} from './storage-service';
import {PageNotFoundError} from '../models/errors/page-not-found-error';
import {GeneralError} from '../models/errors/general-error';

/**
 * Used for fulfilling requests to server.
 */
export class ApiService {
  /**
   * Creates new Api Service.
   *
   * @param {StorageService} storageService - used for storing token and etc.
   */
  constructor(storageService) {
    this.storageService = storageService;
  }

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
        return response.json().then((data) => this.storageService.setItem('token', data.token));
      }
      this.handleCommonErrors(response.status,
        new AuthenticationError('No users found with this login and password.'),
      );
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
        return true;
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
   * @return {ApiService} singleton.
   */
  static getInstance() {
    return service;
  }

  /**
   * Returns authentication header with token.
   *
   * @return {{Authorization: string}}
   */
  _getAuthenticationHeader() {
    return {
      'Authorization':
        `Bearer ${this.storageService.getItem('token')}`,
    };
  }

  /**
   * Handles 401, 404 and 500 error.
   *
   * @param {number} status - error status code.
   * @param {Error} error401 - function that is invoked when status = 401.
   * @param {Error} error500 - function that is invoked when status = 500.
   * @param {Error} error404 - function that is invoked when status = 404.
   */
  handleCommonErrors(status, error401 = new AuthenticationError(),
                     error500 = new GeneralServerError('Server error!'),
                     error404 = new PageNotFoundError()) {
    if (status === 401) {
      throw error401;
    } else if (status === 500) {
      throw error500;
    } else if (status === 404) {
      throw error404;
    } else {
      throw new GeneralError(status);
    }
  }
}

/**
 * Only copy of ApiService that is available on each page.
 *
 * @type {ApiService}
 */
const service = new ApiService(new StorageService(localStorage));
