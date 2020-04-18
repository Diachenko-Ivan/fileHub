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
          return {
            folder: folder
          };
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
          return {
            content: this._fileSystem.getFolderContent(id)
          };
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.post('express:/folder/:folderId/file', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[2];
        if (this._fileSystem.getFolder(id)) {
          const file = request.body.get('file');
          return this._fileSystem.saveFile(file, id);
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});
  }

  _hasAuthToken(headers) {
    const authToken = headers['Authorization'].split(' ')[1];
    return authToken !== 'null';
  }
}
