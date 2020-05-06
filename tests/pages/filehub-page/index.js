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
  
  test('should redirect to login page when folder request returns 401 error.', function (assert) {
    const state = {
      folderLoadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Redirected to login'));
    stateManager.state.folderLoadError = new AuthenticationError();
    assert.verifySteps(['Redirected to login'], 'Should redirect to login page.');
  });
  
  test('should render 404 page if folder is not found.', function (assert) {
    const state = {
      folderLoadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onResourceNotFound(() => assert.step('Render 404 page'));
    stateManager.state.folderLoadError = new PageNotFoundError();
    assert.verifySteps(['Render 404 page'], 'Should render 404 page.');
  });
  
  test('should redirect to login page when folder content request returns 401 error.', function (assert) {
    const state = {
      loadError: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.onFailedAuthorization(() => assert.step('Redirected to login'));
    stateManager.state.loadError = new AuthenticationError();
    assert.verifySteps(['Redirected to login'], 'Should redirect to login page.');
  });
  
  test('should dispatch actions for getting folder and folder content.', function (assert) {
    const state = {
      locationParam: {},
    };
    const stateManager = new StateManager(state, {});
    const fileHub = new FileHubPage(fixture, stateManager);
    fileHub.dispatch = (action)=>{
      assert.step(`${action.constructor.name} ${state.locationParam.id}`);
    };
    stateManager.state.locationParam = {id:'12'};
    assert.verifySteps(["GetFolderAction 12",
      "GetFolderContentAction 12"], 'Should dispatch actions for getting folder and folder content.');
  });
});


