import fetchMock from '../../node_modules/fetch-mock/esm/client.js';

/**
 * Plays role of server that handles requests.
 */
export class MockServer {
  /**
   * Used for development.
   * @type {{folder: {'123': {content: [{size: number, name: string, mimeType: string, type: string}, {size: number, name: string, mimeType: string, type: string}], info: {filesCount: number, name: string, id: string, type: string}}, root: {content: [{filesCount: number, name: string, id: string, type: string}, {size: number, name: string, mimeType: string, type: string}], info: {filesCount: number, name: string, id: string, type: string}}}}}
   * @private
   */
  _folders = {
    'root': {
      info: {name: 'Root', type: 'folder', filesCount: 10, id: 'root'},
      content: [{name: 'Different', type: 'folder', filesCount: 10, id: '123'},
        {name: 'file.pdf', type: 'file', mimeType: 'text', size: 100}]
    },
    '123': {
      info: {name: 'Different', type: 'folder', filesCount: 3, id: '123'},
      content: [{name: 'nature.jpeg', type: 'file', mimeType: 'image', size: 10},
        {name: 'hello.txt', type: 'file', mimeType: 'text', size: 100}]
    },
  };

  /**
   * Creates new {@type MockServer} instance with setting of mappings for concrete requests.
   */
  constructor() {
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
        if (this._folders[id]) {
          return {
            folder: this._folders[id].info
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
        if (this._folders[id]) {
          return {
            content: this._folders[id].content
          };
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
