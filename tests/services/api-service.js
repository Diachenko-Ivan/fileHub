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
  
  test('should successfully send upload file.', function (assert) {
    const done = assert.async();
    assert.expect(4);
    const fileItem = {name: 'file'};
    const file = new File([JSON.stringify(fileItem)], 'file');
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    fetchMock.once('/folder/id/file', (url, opts) => {
      assert.deepEqual(opts.body.get('file'), file, 'Should send correct file.');
      assert.equal(opts.method, 'POST', 'Should send request with correct http method.');
      assert.deepEqual(opts.headers, {'Authorization': 'Bearer token'}, 'Should send correct header.');
      return fileItem;
    });
    service.uploadFile('id', file)
      .then((returnedFile) => {
        assert.deepEqual(fileItem, returnedFile, 'Should return file object on status 200.');
        done();
      });
  });
  
  test('should return server error on file upload.', function (assert) {
    testCommonErrors(assert, '/folder/id/file', 500, 'uploadFile', 'id', new Blob());
  });
  
  test('should return authorization error on file upload.', function (assert) {
    testCommonErrors(assert, '/folder/id/file', 401, 'uploadFile', 'id', new Blob());
  });
  
  test('should return not found error on file upload.', function (assert) {
    testCommonErrors(assert, '/folder/id/file', 404, 'uploadFile', 'id', new Blob());
  });
  
  test('should return success after file deletion.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    fetchMock.once('/file/id', 200);
    service.removeFile('id')
      .then(() => {
        assert.ok(true, 'Should return code 200.');
        done();
      });
    assert.ok(fetchMock.called('/file/id', {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer token'},
    }), 'Should send request with correct attributes.');
  });
  
  test('should return success after folder deletion.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    fetchMock.once('/folder/id', 200);
    service.removeFolder('id')
      .then(() => {
        assert.ok(true, 'Should return code 200.');
        done();
      });
    assert.ok(fetchMock.called('/folder/id', {
      method: 'DELETE',
      headers: {'Authorization': 'Bearer token'},
    }), 'Should send request with correct attributes.');
  });
  
  test('should return server error on remove folder request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 500, 'removeFolder', 'id');
  });
  
  test('should return authorization error on remove folder request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 401, 'removeFolder', 'id');
  });
  
  test('should return not-found error on remove folder request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 404, 'removeFolder', 'id');
  });
  
  test('should return server error on remove file request.', function (assert) {
    testCommonErrors(assert, '/file/id', 500, 'removeFile', 'id');
  });
  
  test('should return authorization error on on remove file request.', function (assert) {
    testCommonErrors(assert, '/file/id', 401, 'removeFile', 'id');
  });
  
  test('should return not-found error on on remove file request.', function (assert) {
    testCommonErrors(assert, '/file/id', 404, 'removeFile', 'id');
  });
  
  
  test('should return correct user.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    const user = {name: 'John'};
    fetchMock.once('/user', user);
    service.getUserInfo()
      .then((responseUser) => {
        assert.deepEqual(user, responseUser, 'Should return correct user.');
        done();
      });
    assert.ok(fetchMock.called('/user', {
        method: 'GET',
        headers: {'Authorization': `Bearer token`},
      },
    ));
  });
  
  test('should return authorization error on get user info.', function (assert) {
    testCommonErrors(assert, '/user', 401, 'getUserInfo');
  });
  
  test('should return server error on get user info.', function (assert) {
    testCommonErrors(assert, '/user', 500, 'getUserInfo');
  });
  
  test('should log out user.', function (assert) {
    const done = assert.async();
    const storageService = {
      getItem() {
        return 'token';
      },
      removeItem() {
        assert.step('Token removed');
      },
    };
    const service = new ApiService(storageService);
    fetchMock.once('/logout', 200);
    service.logOut()
      .then(() => {
        assert.verifySteps(['Token removed'], 'Should remove authentication token.');
        done();
      });
    assert.ok(fetchMock.called('/logout', {
      method: 'POST',
      headers: {'Authorization': 'Bearer token'},
    }), 'Should send log out request with correct attributes.');
  });
  
  test('should return correct model after item rename.', function (assert) {
    const done = assert.async();
    assert.expect(2);
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const model = {id: 'id', type: 'folder', name: 'docs'};
    const service = new ApiService(storageService);
    fetchMock.once('/folder/id', model);
    service.renameItem(model)
      .then((responseItem) => {
        assert.deepEqual(responseItem, model, 'Should return correct model.');
        done();
      });
    assert.ok(fetchMock.called('/folder/id', {
      method: 'PUT',
      headers: {'Authorization': 'Bearer token'},
      body: model,
    }), 'Should send request with correct attributes.');
  });
  
  test('should return server error on item rename request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 500, 'renameItem', {id: 'id', type: 'folder', name: 'docs'});
  });
  
  test('should return authorization error on item rename request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 401, 'renameItem', {id: 'id', type: 'folder', name: 'docs'});
  });
  
  test('should return not-found error on item rename request.', function (assert) {
    testCommonErrors(assert, '/folder/id', 404, 'renameItem', {id: 'id', type: 'folder', name: 'docs'});
  });
  
  test('should return downloaded file.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    const downloadingFile = new Blob(['a', 's'], {type: 'application/json'});
    fetchMock.once('/file/id', downloadingFile);
    service.downloadFile('id')
      .then((blob) => {
        assert.deepEqual(blob, downloadingFile, 'Should return correct file.');
        done();
      });
    assert.ok(fetchMock.called('/file/id', {
      method: 'GET',
      headers: {'Authorization': 'Bearer token'},
    }));
  });
  
  test('should return authorization error on file download.', function (assert) {
    testCommonErrors(assert, '/file/id', 401, 'downloadFile', 'id');
  });
  
  test('should return server error on file download.', function (assert) {
    testCommonErrors(assert, '/file/id', 500, 'downloadFile', 'id');
  });
  
  test('should return not-found error on file download.', function (assert) {
    testCommonErrors(assert, '/file/id', 404, 'downloadFile', 'id');
  });
  
  test('should return new created folder.', function (assert) {
    const done = assert.async();
    const storageService = {
      getItem() {
        return 'token';
      },
    };
    const service = new ApiService(storageService);
    const renamedFolder = {name: 'NewName', parentId: 'id'};
    const responseFolder = {name: 'NewName', id: 'afd', parentId: 'id', filesCount: 0};
    fetchMock.once('/folder/id/folder', responseFolder);
    service.createFolder(renamedFolder)
      .then((folder) => {
        assert.deepEqual(responseFolder, folder, 'Should return correct folder on success.');
        done();
      });
    assert.ok(fetchMock.called(`/folder/${renamedFolder.parentId}/folder`, {
      method: 'POST',
      headers: {'Authorization': 'Bearer token'},
      body: renamedFolder,
    }));
  });
  
  test('should return authorization error on folder creation.', function (assert) {
    testCommonErrors(assert, `/folder/id/folder`, 401, 'createFolder', {parentId: 'id'});
  });
  
  test('should return server error on folder creation.', function (assert) {
    testCommonErrors(assert, `/folder/id/folder`, 500, 'createFolder', {parentId: 'id'});
  });
  
  test('should return not-found error on folder creation..', function (assert) {
    testCommonErrors(assert, `/folder/id/folder`, 404, 'createFolder', {parentId: 'id'});
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
    removeItem() {
    },
  };
  const service = new ApiService(storageService);
  fetchMock.once(url, errorCode);
  assert.rejects(service[apiServiceMethod](...params), errorsMap[errorCode], `Should return ${errorsMap[errorCode].name}.`);
  done();
}
