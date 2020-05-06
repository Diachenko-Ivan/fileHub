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
   * Sends request for user authentication and returns its result.
   *
   * @param {UserCredentials} userCredentials - user`s login form credentials.
   * @return {Promise} result of login.
   */
  logIn(userCredentials) {
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((data) => this.storageService.setItem('token', data.token));
      } else if (response.status === 401) {
        throw new AuthenticationError('No users found with this login and password.');
      }
      return this._handleCommonErrors(response);
    });
  }
  
  /**
   * Sends request for registration of new user and returns result of registration.
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
      }
      return this._handleCommonErrors(response);
    });
  }
  
  /**
   * Tries to get full file item list.
   *
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFileItemList() {
    return fetch('/file-list', {
        method: 'GET',
        headers: this.authenticationHeader()
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      this.handleCommonErrors(response.status);
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
   * Handles errors that can come from request.
   *
   * @param {Response} response - response object from server.
   * @private
   */
  async _handleCommonErrors(response) {
    const availableCodesToErrorMap = {
      401: () => new AuthenticationError(),
      404: () => new PageNotFoundError(),
      422: (error) => new ValidationError(error),
      500: () => new GeneralServerError('Server error.'),
    };
    const status = response.status;
    const errorHandler = availableCodesToErrorMap[status];
    if (errorHandler) {
      const errorObject = await response.json();
      throw errorHandler(errorObject);
    } else {
      const textFromServer = await response.text();
      throw new GeneralError(status, textFromServer);
    }
  }
}

/**
 * Only copy of ApiService that is available on each page.
 *
 * @type {ApiService}
 */
const service = new ApiService(new StorageService(localStorage));
