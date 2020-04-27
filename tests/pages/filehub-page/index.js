import {FileHubPage} from '../../../app/pages/filehub-page';
import {StateManager} from '../../../app/states/state-manager';

const {test, module} = QUnit;

export default module('FileHubPage test', function (hook) {
  let fixture = document.getElementById('qunit-fixture');
  
  test('should render file hub page.', function (assert) {
    new FileHubPage(fixture, new StateManager({}, {}));
    const fileHubPage = fixture.firstElementChild;
    assert.ok(fileHubPage, 'Should successfully render file hub page.');
  });
});
