import {DirectoryPath} from '../../../app/component/directory-path';

const {test, module} = QUnit;

export default module('DirectoryPath test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render directory path component.', function (assert) {
    new DirectoryPath(fixture);
    const directoryPath = fixture.firstElementChild;
    assert.ok(directoryPath, 'Should contain directory path.');
  });

  test('should change folder name.', function (assert) {
    const directoryPathComponent = new DirectoryPath(fixture);

    const folder = 'Docs';
    directoryPathComponent.folderName = folder;

    const folderName = directoryPathComponent.rootContainer.querySelector('[data-element="folder-name"]').innerText;
    assert.strictEqual(`/ ${folder}`, folderName, 'Should contain directory path.');
  });
});
