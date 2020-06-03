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
    
    const folder = {name: 'Folder', parentId: '123', id: 'folderId'};
    directoryPathComponent.folder = folder;
    
    const folderName = fixture.querySelector('[data-element="folder-name"]').innerText;
    assert.strictEqual(`/ ${folder.name}`, folderName, 'Should contain directory path.');
  });
  
  
  test('should set different folder icons.', function (assert) {
    const directoryPathComponent = new DirectoryPath(fixture);
    const parentFolderId = 'root';
    const url = '#/folder/' + parentFolderId;
    
    directoryPathComponent.folder = {name: 'Folder', parentId: parentFolderId, id: '123'};
    const anchor = fixture.querySelector(`a[href="${url}"]`);
    
    assert.ok(anchor, 'Should contain anchor link with the same href.');
  });
  
  test('should set directory path to loading state.', function (assert) {
    const directoryPathComponent = new DirectoryPath(fixture);
    const directoryPathElement = fixture.firstElementChild;
    assert.notOk(directoryPathElement.classList.contains('is-loading'), 'Should not contain style class when it is firstly rendered.');
    directoryPathComponent.isLoading = true;
    assert.ok(directoryPathElement.classList.contains('is-loading'), 'Should contain style class.');
  });
});
