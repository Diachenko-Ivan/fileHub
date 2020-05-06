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
  logIn(userCredentials) {
    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((data) => this.storageService.setItem('token', data.token));
      }
      return this.handleCommonErrors(response);
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
      }
      return this.handleCommonErrors(response);
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
   */
  async handleCommonErrors(response) {
    const availableCodesToErrorMap = {
      401: (error) => new AuthenticationError(error.message),
      404: (error) => new PageNotFoundError(error.message),
      422: (error) => new ValidationError(error),
      500: (error) => new GeneralServerError(error.message),
    };
    const status = response.status;
    if (availableCodesToErrorMap[status]) {
      const errorObject = await response.json();
      throw availableCodesToErrorMap[status](errorObject);
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
