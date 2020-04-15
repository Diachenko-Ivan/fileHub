import {FolderComponent} from '../../../../app/component/file-item/folder';

const {test, module} = QUnit;

export default module('FolderComponent test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render folder component.', function (assert) {
    const folderName = 'documents';
    const filesCount = 10;
    const folderComponent = new FolderComponent(fixture, {name: folderName, filesCount: filesCount});
    const folder = fixture.firstElementChild;

    const renderedFolderName = folderComponent.rootContainer.querySelector('[data-test="folder-name"]').innerText;
    const renderedFilesCount = folderComponent.rootContainer.querySelector('[data-test="file-count"]').innerText;

    assert.ok(folder, 'Should contain rendered folder.');
    assert.strictEqual(renderedFolderName, folderName, 'Should render correct folder name.');
    assert.strictEqual(renderedFilesCount, filesCount.toString(), 'Should render correct files count.');
  });
});
