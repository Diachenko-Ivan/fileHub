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
      this.handleCommonErrors(response.status,
        new AuthenticationError('No users found with this login and password.'),
        new GeneralServerError('Server error!'),
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
   * Tries to get folder by its id.
   *
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFolder(folderId) {
    return fetch(`/folder/${folderId}`, {
        method: 'GET',
        headers: this.authenticationHeader()
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      this.handleCommonErrors(response.status,
        new AuthenticationError(),
        new GeneralServerError('Server error!'),
      );
    });
  }

  /**
   * Tries to get folder content.
   *
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFolderContent(folderId) {
    return fetch(`/folder/${folderId}/content`, {
        method: 'GET',
        headers: this.authenticationHeader()
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      this.handleCommonErrors(response.status,
        new AuthenticationError(),
        new GeneralServerError('Server error!'),
      );
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
   * Handles 401, 404 and 500 error.
   *
   * @param {number} status - error status code.
   * @param {Error} error401 - function that is invoked when status = 401.
   * @param {Error} error500 - function that is invoked when status = 500.
   * @param {Error} error404 - function that is invoked when status = 404.
   */
  handleCommonErrors(status, error401, error500, error404 = new Error()) {
    if (status === 401) {
      throw error401;
    } else if (status === 500) {
      throw error500;
    } else if (status === 404) {
      throw error404;
    }
  }
}

/**
 * Only copy of ApiService that is available on each page.
 *
 * @type {ApiService}
 */
const service = new ApiService(new StorageService(localStorage));
