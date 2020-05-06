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
    
    directoryPathComponent.folder = {name: 'Folder', id: '123'};
    const absentAnchor = fixture.getElementsByTagName('a')[0];
    
    assert.notOk(absentAnchor, 'Should not contain anchor link if is root.');
  });
});
