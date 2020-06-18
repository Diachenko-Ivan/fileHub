import fetchMock from '../../../../../../node_modules/fetch-mock/esm/client.js';
import {MockFileSystem} from './mock-file-system/index.js';

/**
 * Plays role of server that handles requests.
 */
export class MockServer {
  /**
   * Creates new {@type MockServer} instance with setting of mappings for concrete requests.
   */
  constructor() {
    this._fileSystem = new MockFileSystem([
      {name: 'Different', type: 'folder', filesCount: 10, id: '123', parentId: 'root'},
      {name: 'Root', type: 'folder', filesCount: 10, id: 'root'},
    ], [
      {name: 'nature.jpeg', type: 'file', mimeType: 'image', size: 10, id: 'abs', parentId: '123'},
      {name: 'hello.txt', type: 'file', mimeType: 'text', size: 100, id: 'qwe', parentId: '123'},
      {name: 'file.pdf', type: 'file', mimeType: 'text', size: 100, id: 'zxc', parentId: 'root'},
    ]);

    fetchMock.post('/api/login', (url, request) => {
      const credentials = JSON.parse(request.body);
      if (credentials.login === 'admin' && credentials.password === 'Password1') {
        return {token: 'authentication_token'};
      }
      return 401;
    });

    fetchMock.post('/api/register', (url, request) => {
      const credentials = JSON.parse(request.body);
      if (credentials.login === 'admin') {
        return {
          body: {
            errors: [{field: 'login', message: 'User with this login already exists.'}],
          },
          status: 422,
        };
      }
      return 200;
    });

    fetchMock.get('express:/api/folder/:folderId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        const folder = this._fileSystem.getFolder(id);
        if (folder) {
          return folder;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.get('express:/api/folder/:folderId/content', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        if (this._fileSystem.getFolder(id)) {
          return this._fileSystem.getFolderContent(id);
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.post('express:/api/folder/:folderId/file', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        if (this._fileSystem.getFolder(id)) {
          const file = request.body.get('file');
          return this._fileSystem.saveFile(file, id);
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.post('/api/logout', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        return 200;
      }
      return 401;
    }, {delay: 500});

    fetchMock.put('express:/api/file/:fileId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        const fileToRename = this._fileSystem.getFile(id);
        if (fileToRename) {
          const renamedFile = JSON.parse(request.body);
          this._fileSystem.renameFile(id, renamedFile);
          return fileToRename;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.put('express:/api/folder/:folderId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        const folderToRename = this._fileSystem.getFolder(id);
        if (folderToRename) {
          const renamedFolder = JSON.parse(request.body);
          this._fileSystem.renameFolder(id, renamedFolder);
          return folderToRename;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.delete('express:/api/folder/:folderId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        if (this._fileSystem.getFolder(id)) {
          this._fileSystem.deleteFolder(id);
          return 200;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.delete('express:/api/file/:fileId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        const fileToRemove = this._fileSystem.getFile(id);
        if (fileToRemove) {
          this._fileSystem.deleteFile(id);
          return 200;
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.get('/api/user', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        return {
          name: 'John',
          id: 'qwerty',
        };
      }
      return 401;
    }, {delay: 500});

    fetchMock.get('express:/api/file/:fileId', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        if (this._fileSystem.getFile(id)) {
          return new File([JSON.stringify({name: 's'})], 'name', {type: 'application/json'});
        } else {
          return 404;
        }
      }
      return 401;
    }, {delay: 500});

    fetchMock.post('express:/api/folder/:folderId/folder', (url, request) => {
      if (this._hasAuthToken(request.headers)) {
        const id = url.split('/')[3];
        const parentFolder = this._fileSystem.getFolder(id);
        if (parentFolder) {
          return this._fileSystem.createFolder(id);
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
    return authToken === 'authentication_token';
  }
}
