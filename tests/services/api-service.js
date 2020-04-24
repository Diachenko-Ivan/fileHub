import {ApiService} from '../../app/services/api-service.js';
import {UserCredentials} from '../../app/models/user-credentials';
import fetchMock from '../../node_modules/fetch-mock/esm/client.js';
import {AuthenticationError} from '../../app/models/errors/authentication-error';
import {ValidationError} from '../../app/models/errors/validation-error';

const {test, module} = QUnit;

export default module('ApiService test', function (hook) {
  
  hook.afterEach(fetchMock.restore);
  
  test('should set correct token to storage after authentication.', function (assert) {
    assert.expect(3);
    const token = 'auth_token';
    const userCredentials = {login: 'login', password: 'password'};
    fetchMock.once('/login', (url, opts) => {
      assert.deepEqual(JSON.parse(opts.body), userCredentials, 'Should send request with correct arguments.');
      return {token};
    });
    const storageService = {
      setItem() {
        assert.step('Set');
      },
    };
    const service = new ApiService(storageService);
    const done = assert.async();
    service.login(userCredentials)
      .then(() => {
        assert.verifySteps(['Set'], 'Should set token after success authentication.');
        done();
      });
  });
  
  test('should return authentication error.', function (assert) {
    assert.expect(1);
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
    assert.expect(2);
    const done = assert.async();
    const storageService = {};
    const service = new ApiService(storageService);
    const userCredentials = {login: 'login', password: 'password'};
    fetchMock.once('/register', (url, opts) => {
      assert.deepEqual(JSON.parse(opts.body), userCredentials, 'Should send request with correct arguments.');
      return 200;
    });
    service.register(userCredentials)
      .then((response) => {
        assert.ok(response, 'Should return successful registration.');
        done();
      });
  });
  
  test('should return validation error.', function (assert) {
    const done = assert.async();
    assert.expect(4);
    const storageService = {};
    const service = new ApiService(storageService);
    const validationErrors = [{field: 'login', message: 'User with this login already exists.'}];
    fetchMock.once('/register', {
      body: {
        errors: validationErrors,
      },
      status: 422,
    });
    service.register(new UserCredentials('admin', 'password'))
      .catch((error) => {
        assert.ok(error instanceof ValidationError, 'Should return validation error.');
        assert.strictEqual(error.errors.length, validationErrors.length, 'Should contain correct number of validation errors');
        assert.strictEqual(error.errors[0].field, validationErrors[0].field, 'Should contain same validation field.');
        assert.strictEqual(error.errors[0].message, validationErrors[0].message, 'Should contain same validation error message.');
        done();
      });
  });
});
