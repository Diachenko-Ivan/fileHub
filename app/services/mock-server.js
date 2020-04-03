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
  }
}
