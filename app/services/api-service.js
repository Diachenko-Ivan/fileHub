import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {GeneralServerError} from '../models/errors/server-error';
import {AuthenticationError} from '../models/errors/authentication-error';
import {StorageService} from './storage-service';
import {FileItemNotFoundError} from '../models/errors/file-item-not-found';

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
   * @param {string} folderId - folder id.
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFolder(folderId) {
    return fetch(`/folder/${folderId}`, {
        method: 'GET',
        headers: this._authenticationHeader()
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      this.handleCommonErrors(response.status,
        new AuthenticationError(),
        new GeneralServerError('Server error!'),
        new FileItemNotFoundError('Folder not found.')
      );
    });
  }

  /**
   * Tries to get folder content.
   *
   * @param {string} folderId - folder id.
   * @return {Promise} either object with file list or error if server is gone down.
   */
  getFolderContent(folderId) {
    return fetch(`/folder/${folderId}/content`, {
        method: 'GET',
        headers: this._authenticationHeader()
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      this.handleCommonErrors(response.status,
        new AuthenticationError(),
        new GeneralServerError('Server error!'),
        new FileItemNotFoundError('Folder not found.')
      );
    });
  }

  /**
   * Removes folder.
   *
   * @param {string} id - folder id.
   * @return {Promise<Response>} successful or unsuccessful result of deletion.
   */
  removeFolder(id) {
    return fetch(`/folder/${id}`, {
      method: 'DELETE',
      headers: this._authenticationHeader(),
    }).then((response) => {
      if (response.ok) {
        return `Folder with id ${id} deleted.`;
      }
      this.handleCommonErrors(response.status, () => {
        window.location.hash = LOGIN_PAGE_URL;
      }, () => {
        throw new GeneralServerError('Server error!');
      });
    });
  }

  /**
   * Removes file.
   *
   * @param {string} id - file id.
   * @return {Promise<Response>} successful or unsuccessful result of deletion.
   */
  removeFile(id) {
    return fetch(`/file/${id}`, {
      method: 'DELETE',
      headers: this._authenticationHeader(),
    }).then((response) => {
      if (response.ok) {
        return `File with id ${id} deleted.`;
      }
      this.handleCommonErrors(response.status, () => {
        window.location.hash = LOGIN_PAGE_URL;
      }, () => {
        throw new GeneralServerError('Server error!');
      });
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
  _authenticationHeader() {
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
