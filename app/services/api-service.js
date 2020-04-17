import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {GeneralServerError} from '../models/errors/server-error';
import {AuthenticationError} from '../models/errors/authentication-error';
import {StorageService} from './storage-service';

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
      this.handleCommonErrors(response.status, () => {
        throw new AuthenticationError('No users found with this login and password.');
      }, () => {
        throw new GeneralServerError('Server error!');
      });
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
  authenticationHeader() {
    return {
      'Authorization':
        `Bearer ${this.storageService.getItem('token')}`
    };
  }

  /**
   * Handles 401 and 500 error.
   *
   * @param {number} status - error status code.
   * @param {Function} unauthorizedErrorHandler - function that is invoked when status = 401.
   * @param {Function} serverErrorHandler - function that is invoked when status = 500.
   */
  handleCommonErrors(status, unauthorizedErrorHandler, serverErrorHandler) {
    if (status === 401) {
      unauthorizedErrorHandler();
    } else if (status === 500) {
      serverErrorHandler();
    }
  }
}

/**
 * Only copy of ApiService that is available on each page.
 *
 * @type {ApiService}
 */
const service = new ApiService(new StorageService(localStorage));
