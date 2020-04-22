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


  test('should set different folder icons.', function (assert) {
    const directoryPathComponent = new DirectoryPath(fixture);
    const url = '#/folder/root';

    directoryPathComponent.setInnerFolderIcon(url);
    const anchor = fixture.getElementsByTagName('a')[0];

    assert.ok(anchor, 'Should contain anchor link if is inner.');
    assert.strictEqual(anchor.getAttribute('href'), url, 'Should contain the same href.')

    directoryPathComponent.setRootFolderIcon();
    const absentAnchor = fixture.getElementsByTagName('a')[0];

    assert.notOk(absentAnchor, 'Should not contain anchor link if is root.');
  });
});
