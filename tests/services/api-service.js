import {ApiService} from '../../app/services/api-service.js';
import {UserCredentials} from '../../app/models/user-credentials';
import fetchMock from '../../node_modules/fetch-mock/esm/client.js';
import {AuthenticationError} from '../../app/models/errors/authentication-error';
import {ValidationError} from '../../app/models/errors/validation-error';
import {GeneralServerError} from '../../app/models/errors/server-error';
import {PageNotFoundError} from '../../app/models/errors/page-not-found-error';

const {test, module} = QUnit;

export default module('ApiService', function (hook) {
  
  hook.afterEach(fetchMock.restore);
  
  test('should set correct token to storage after authentication.', function (assert) {
    assert.expect(3);
    const tokenValue = 'auth_token';
    const userCredentials = {login: 'login', password: 'password'};
    fetchMock.once('/login', (url, opts) => {
      assert.deepEqual(JSON.parse(opts.body), userCredentials, 'Should send request with correct arguments.');
      return {token: tokenValue};
    });
    const storageService = {
      setItem(key, value) {
        assert.step(`Set ${key} ${value}`);
      },
    };
    const service = new ApiService(storageService);
    const done = assert.async();
    service.logIn(userCredentials)
      .then(() => {
        assert.verifySteps([`Set token ${tokenValue}`], 'Should set token with correct value after success authentication.');
        done();
      });
  });
  
  test('should return authentication error.', function (assert) {
    assert.expect(1);
    const done = assert.async();
    const storageService = {};
    const service = new ApiService(storageService);
    fetchMock.once('/login', 401);
    service.logIn(new UserCredentials('admin', 'password'))
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

  test('should return folder on success.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    const folder = {name: 'folder'};
    fetchMock.once('/folder/id', folder);
    service.getFolder('id')
      .then((folderResponse) => {
        assert.deepEqual(folder, folderResponse, 'Should return equal folder.');
        done();
      });
    assert.ok(fetchMock.called('/folder/id', {
      method: 'GET',
      headers: {'Authorization': `Bearer token`},
    }), 'Should send request for accepting folder with correct params.');
  });
  
  test('should return folder content on success.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    const folderContentResponse = [{name: 'folder'}];
    fetchMock.once('/folder/id/content', folderContentResponse);
    service.getFolderContent('id')
      .then((folderContent) => {
        assert.deepEqual(folderContentResponse, folderContent, 'Should return equal folder content.');
        done();
      });
    assert.ok(fetchMock.called('/folder/id/content', {
      method: 'GET',
      headers: {'Authorization': `Bearer token`},
    }), 'Should send request for accepting folder with correct params.');
  });
  
  test('should return authentication error on get folder.', function (assert) {
    testCommonErrors(assert, '/folder/id', 401, 'getFolder', 'id');
  });

  test('should return not found error on get folder.', function (assert) {
    testCommonErrors(assert, '/folder/id', 404, 'getFolder', 'id');
  });

  test('should return server error on get folder.', function (assert) {
    testCommonErrors(assert, '/folder/id', 500, 'getFolder', 'id');
  });
  
  test('should return authentication error on get folder content.', function (assert) {
    testCommonErrors(assert, '/folder/id/content', 401, 'getFolderContent', 'id');
  });
  
  test('should return not found error on get folder content.', function (assert) {
    testCommonErrors(assert, '/folder/id/content', 404, 'getFolderContent', 'id');
  });
  
  test('should return server error on get folder content.', function (assert) {
    testCommonErrors(assert, '/folder/id/content', 500, 'getFolderContent', 'id');
  });

  test('should return correct user.', function (assert) {
    const done = assert.async();
    const storageService = {
      getItem(){}
    };
    const service = new ApiService(storageService);
    const user = {name:'John'};
    fetchMock.once('/user', user);
    service.getUserInfo()
      .then((responseUser) => {
        assert.deepEqual(user, responseUser, 'Should return correct user.');
        done();
      });
  });
});

function testCommonErrors(assert, url, errorCode, apiServiceMethod, ...params) {
  const errorsMap = {
    404: PageNotFoundError,
    401: AuthenticationError,
    500: GeneralServerError,
  };
  const done = assert.async();
  assert.expect(1);
  const storageService = {
    getItem() {
    },
  };
  const service = new ApiService(storageService);
  fetchMock.once(url, errorCode);
  assert.rejects(service[apiServiceMethod](params), errorsMap[errorCode], `Should return ${errorsMap[errorCode].name}.`);
  done();
}
