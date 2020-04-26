import {FileHubPage} from '../../../app/pages/filehub-page';

const {test, module} = QUnit;

export default module('FileHubPage test', function (hook) {
  let fixture=document.getElementById('qunit-fixture');

  test('should render file hub page.', function (assert) {
    new FileHubPage(fixture);
    const fileHubPage = fixture.firstElementChild;
    assert.ok(fileHubPage, 'Should successfully render file hub page.')
  });
});
