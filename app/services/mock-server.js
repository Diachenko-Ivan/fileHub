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
        return new Response(
          new Blob([JSON.stringify({
            errors: [{field: 'login', message: 'User with this login already exists.'}]
          })], {type: 'application/json'}), {
            status: 422
          });
      }
      return 200;
    });
  
    fetchMock.post('/file-list', (url, request) => {
      const token = JSON.parse(request.body).token;
      if (token) {
        return new Response(
          new Blob([JSON.stringify({
            fileList: [{name: 'Documents', type: 'folder', itemCount: 10},
              {name: 'file.pdf', type: 'file', size: 100}]
          })], {type: 'application/json'}), {
            status: 200
          });
      }
      return 401;
    });
  }
}
