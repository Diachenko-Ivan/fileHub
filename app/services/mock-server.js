import fetchMock from '../../node_modules/fetch-mock/esm/client.js';

/**
 * Plays role of server that handles requests.
 */
export class MockServer {
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

    fetchMock.get('/file-list', (url, request) => {
      const authToken = request.headers['Authorization'].split(' ')[1];
      if (authToken !== 'null') {
        return {
          body: {
            fileList: [{name: 'Documents', type: 'folder', filesCount: 10},
              {name: 'file.pdf', type: 'file', mimeType: 'text', size: 100}]
          },
          status: 200,
        };
      }
      return 401;
    }, {delay: 500});
  }
}
