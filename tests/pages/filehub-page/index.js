import {FileHubPage} from '../../../app/pages/filehub-page';
import {StateManager} from '../../../app/states/state-manager';
import {AuthenticationError} from '../../../app/models/errors/authentication-error';
import {PageNotFoundError} from '../../../app/models/errors/page-not-found-error';
import {GetFolderAction} from '../../../app/states/actions/get-folder-action';
import {GetFolderContentAction} from '../../../app/states/actions/get-folder-content-action';
import {GetUserInfoAction} from '../../../app/states/actions/user-info-action';
import {GeneralServerError} from '../../../app/models/errors/server-error';

const {test, module} = QUnit;

export default module('FileHubPage', function () {
  let fixture = document.getElementById('qunit-fixture');
  
  test('should render file hub page.', function (assert) {
    new FileHubPage(fixture, new StateManager({}, {}));
    const fileHubPage = fixture.firstElementChild;
    assert.ok(fileHubPage, 'Should successfully render file hub page.');
  });
  
  test('should call method for failed authorization in getting of folder.', function (assert) {
    const state = {
      folderLoadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.folderLoadError = new AuthenticationError();
    assert.verifySteps(['Authorization failed'], 'Should call method for failed authorization case.');
  });
  
  test('should call method for resource not found error in getting of folder.', function (assert) {
    const state = {
      folderLoadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onResourceNotFound(() => assert.step('Not found'));
    stateManager.state.folderLoadError = new PageNotFoundError();
    assert.verifySteps(['Not found'], 'Should call method for resource not found error.');
  });
  
  test('should show pop-up with server error in getting of folder.', function (assert) {
    const state = {
      folderLoadError: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.loadError = new GeneralServerError();
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method for failed authorization in getting of folder content.', function (assert) {
    const state = {
      loadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.loadError = new AuthenticationError();
    assert.verifySteps(['Authorization failed'], 'Should redirect to login page.');
  });
  
  test('should call method for resource not found error in getting of folder content.', function (assert) {
    const state = {
      loadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onResourceNotFound(() => assert.step('Not found content'));
    stateManager.state.loadError = new PageNotFoundError();
    assert.verifySteps(['Not found content'], 'Should call method for resource not found error.');
  });
  
  test('should show pop-up with server error in getting of folder content.', function (assert) {
    const state = {
      loadError: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.loadError = new GeneralServerError();
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should dispatch actions for getting user info, folder and folder content.', function (assert) {
    const state = {
      user: {id: 'sdfsd', name: 'John'},
      set locationParam(value) {
        this._locationParam = value;
        this.handler();
      },
      get locationParam() {
        return this._locationParam;
      },
    };
    const stateManager = {
      state,
      onStateChanged(property, handler) {
        if (property === 'locationParam') {
          state.handler = handler;
        } else if (property === 'user') {
          state.userHanler = handler;
        }
      },
      dispatch(action) {
        if (action instanceof GetFolderAction) {
          assert.step(`GetFolderAction ${state.locationParam.id}`);
        } else if (action instanceof GetFolderContentAction) {
          assert.step(`GetFolderContentAction ${state.locationParam.id}`);
        } else if (action instanceof GetUserInfoAction) {
          assert.step(`UserInfoAction ${state.user.name}`);
        } else {
          assert.step(action.constructor.name);
        }
      },
    };
    new FileHubPage(fixture, stateManager);
    stateManager.state.locationParam = {id: '12'};
    assert.verifySteps([
      'UserInfoAction John',
      'GetFolderAction 12',
      'GetFolderContentAction 12'], 'Should dispatch actions for getting user, folder and folder content.');
  });
  
  test('should call method for authorization error in getting of user info.', function (assert) {
    const state = {
      userError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('User is unauthorized'));
    stateManager.state.userError = new AuthenticationError();
    assert.verifySteps(['User is unauthorized'], 'Should call method for authorization error.');
  });
  
  test('should show pop-up with server error in getting of user info.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.uploadErrorObject = {error: new GeneralServerError(), model: {}};
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method for authorization failed error on file upload.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.uploadErrorObject = {model: {}, error: new AuthenticationError()};
    assert.verifySteps(['Authorization failed'], 'Should call method for authorization failed error.');
  });
  
  test('should show pop-up with not-found error on file upload.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed not found error'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.uploadErrorObject = {error: new PageNotFoundError(), model: {}};
    assert.verifySteps(['Showed not found error'], 'Should show pop-up server error message.');
  });
  
  test('should show pop-up with server error on file upload.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.uploadErrorObject = {error: new GeneralServerError(), model: {}};
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method for failed authorization in item removing.', function (assert) {
    const state = {
      removeError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.removeError = new AuthenticationError();
    assert.verifySteps(['Authorization failed'], 'Should redirect to login page.');
  });
  
  test('should show pop-up with server error in item removing.', function (assert) {
    const state = {
      removeError: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.removeError = new GeneralServerError();
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method for failed authorization in item renaming.', function (assert) {
    const state = {
      renameErrorObject: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.renameErrorObject = {error: new AuthenticationError(), model: {}};
    assert.verifySteps(['Authorization failed'], 'Should redirect to login page.');
  });
  
  test('should show pop-up with server error in item renaming.', function (assert) {
    const state = {
      renameErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.renameErrorObject = {error: new GeneralServerError(), model: {}};
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should show pop-up with not-found error in item renaming.', function (assert) {
    const state = {
      renameErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed not found message'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.renameErrorObject = {error: new PageNotFoundError(), model: {}};
    assert.verifySteps(['Showed not found message'], 'Should show pop-up server error message.');
  });
  
  test('should call method for failed authorization in file download.', function (assert) {
    const state = {
      downloadErrorObject: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.downloadErrorObject = {model: {name: '123'}, error: new AuthenticationError()};
    assert.verifySteps(['Authorization failed'], 'Should redirect to login page.');
  });
  
  test('should show pop-up with server error in file download.', function (assert) {
    const state = {
      downloadErrorObject: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.downloadErrorObject = {error: new GeneralServerError(), model: {}};
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method for failed authorization in folder creation.', function (assert) {
    const state = {
      createFolderError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.createFolderError = new AuthenticationError();
    assert.verifySteps(['Authorization failed'], 'Should redirect to login page.');
  });
  
  test('should show pop-up with server error in folder creation.', function (assert) {
    const state = {
      createFolderError: {},
      newFolderSource: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Showed server error.'),
    };
    const stateManager = new StateManager(state, {});
    new FileHubPage(fixture, stateManager, toastService);
    stateManager.state.createFolderError = new GeneralServerError();
    assert.verifySteps(['Showed server error.'], 'Should show pop-up server error message.');
  });
  
  test('should call method and show pop-up for not found error in folder creation.', function (assert) {
    const state = {
      createFolderError: {},
      newFolderSource: {},
    };
    const toastService = {
      showErrorMessage: () => assert.step('Show 404 error message'),
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager, toastService);
    fileHub.onResourceNotFound(() => assert.step('Show 404 page'));
    stateManager.state.createFolderError = new PageNotFoundError();
    assert.verifySteps(['Show 404 error message', 'Show 404 page'], 'Should show pop-up server error message.');
  });
});


