import {FileHubPage} from '../../../app/pages/filehub-page';
import {StateManager} from '../../../app/states/state-manager';
import {AuthenticationError} from '../../../app/models/errors/authentication-error';
import {PageNotFoundError} from '../../../app/models/errors/page-not-found-error';
import {GetFolderAction} from '../../../app/states/actions/get-folder-action';
import {GetFolderContentAction} from '../../../app/states/actions/get-folder-content-action';
import {GetUserInfoAction} from '../../../app/states/actions/user-info-action';

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
  
  test('should call method for authorization failed error on file upload.', function (assert) {
    const state = {
      uploadErrorObject: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Authorization failed'));
    stateManager.state.uploadErrorObject = {model:{}, error: new AuthenticationError()};
    assert.verifySteps(['Authorization failed'], 'Should call method for authorization failed error.');
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
});


