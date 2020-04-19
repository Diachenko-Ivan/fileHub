import fetchMock from '../../node_modules/fetch-mock/esm/client.js';
import {MockFileSystem} from './mock-file-system';

/**
 * Plays role of server that handles requests.
 */
export class MockServer {
  /**
   * Creates new {@type MockServer} instance with setting of mappings for concrete requests.
   */
  constructor() {
    this._fileSystem = new MockFileSystem();

    fetchMock.post('/login', (url, request) => {
      const credentials = JSON.parse(request.body);
      if (credentials.login === 'admin' && credentials.password === 'Password1') {
        return {token: 'authentication_token'};
      }
      return 401;
    });

    fetchMock.post('/register', (url, request) => {
      const credentials = JSON.parse(request.body);
      if (credentials.login === 'admin') {
        return {
          body: {
            errors: [{field: 'login', message: 'User with this login already exists.'}]
          },
          status: 422
        };
      }
      return 200;
    });

    fetchMock.get('express:/folder/:folderId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[2];
        const folder = this._fileSystem.getFolder(id);
        if (folder) {
          return folder;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.get('express:/folder/:folderId/content', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[2];
        if (this._fileSystem.getFolder(id)) {
          return this._fileSystem.getFolderContent(id);
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.delete('express:/folder/:folderId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[2];
        if (this._fileSystem.getFolder(id)) {
          this._fileSystem.deleteFolder(id);
          return 200;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.delete('express:/file/:fileId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[2];
        const fileToRemove=this._fileSystem.getFile(id);
        if (fileToRemove) {
          this._fileSystem.deleteFile(id);
          return 200;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});
  }

  /**
   * Checks authentication token to not be null.
   *
   * @param {{}} headers - request headers.
   * @return {boolean} - existence of authentication token.
   * @private
   */
  _hasAuthToken(headers) {
    const authToken = headers['Authorization'].split(' ')[1];
    return authToken !== 'null';
  }
}
