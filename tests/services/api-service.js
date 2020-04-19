import {ApiService} from '../../app/services/api-service.js';
import {UserCredentials} from '../../app/models/user-credentials';
import fetchMock from '../../node_modules/fetch-mock/esm/client.js';
import {AuthenticationError} from '../../app/models/errors/authentication-error';
import {ValidationError} from '../../app/models/errors/validation-error';

const {test, module} = QUnit;

export default module('ApiService test', function (hook) {

  hook.afterEach(fetchMock.restore);

  test('should set right token to storage.', function (assert) {
    const token = 'auth_token';
    fetchMock.once('/login', {token});
    const storageService = {
      map: {},
      setItem(key, value) {
        this.map[key] = value;
      },
      getItem(key) {
        return this.map[key];
      }
    };
    const service = new ApiService(storageService);
    const done = assert.async();
    service.login(new UserCredentials('login', 'password'))
      .then(() => {
        assert.ok(storageService.getItem('token') === token, 'Should set correct token.');
        done();
      });
  });

  test('should check the return of authentication error.', function (assert) {
    const done = assert.async();
    const storageService = {};
    const service = new ApiService(storageService);
    fetchMock.once('/login', 401);
    service.login(new UserCredentials('admin', 'password'))
      .catch((error) => {
        assert.ok(error instanceof AuthenticationError, 'Should return authentication error.');
        done();
      });
  });

  test('should return success registration.', function (assert) {
    const done = assert.async();
    const storageService = {};
    const service = new ApiService(storageService);
    fetchMock.once('/register', 200);
    service.register(new UserCredentials('admin', 'password'))
      .then((response) => {
        assert.ok(response, 'Should return successful registration.');
        done();
      });
  });

  test('should return validation error.', function (assert) {
    const done = assert.async();
    const storageService = {};
    const service = new ApiService(storageService);
    const validationErrors = [{field: 'login', message: 'User with this login already exists.'}];
    fetchMock.once('/register', {
      body: {
        errors: validationErrors
      },
      status: 422
    });
    service.register(new UserCredentials('admin', 'password'))
      .catch((error) => {
        assert.ok(error instanceof ValidationError, 'Should return validation error.');
        assert.ok(error.errors, 'Should contains same validation errors.');
        done();
      });
  });
});
