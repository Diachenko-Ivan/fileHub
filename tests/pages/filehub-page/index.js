import {FileHubPage} from '../../../app/pages/filehub-page';
import {StateManager} from '../../../app/states/state-manager';
import {AuthenticationError} from '../../../app/models/errors/authentication-error';
import {PageNotFoundError} from '../../../app/models/errors/page-not-found-error';

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
    fileHub.onFailedAuthorization(() => assert.step('Authorization is needed'));
    stateManager.state.folderLoadError = new AuthenticationError();
    assert.verifySteps(['Authorization is needed'], 'Should call method for failed authorization case.');
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
    fileHub.onFailedAuthorization(() => assert.step('Authorization is needed'));
    stateManager.state.loadError = new AuthenticationError();
    assert.verifySteps(['Authorization is needed'], 'Should redirect to login page.');
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
  
  test('should dispatch actions for getting folder and folder content.', function (assert) {
    const state = {
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
        }
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${state.locationParam.id}`);
      },
    };
    new FileHubPage(fixture, stateManager);
    stateManager.state.locationParam = {id: '12'};
    assert.verifySteps(['GetFolderAction 12',
      'GetFolderContentAction 12'], 'Should dispatch actions for getting folder and folder content.');
  });
});


