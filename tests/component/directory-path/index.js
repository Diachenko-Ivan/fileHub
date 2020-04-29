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
    
    const folderName = fixture.querySelector('[data-element="folder-name"]').innerText;
    assert.strictEqual(`/ ${folder}`, folderName, 'Should contain directory path.');
  });
  
  
  test('should set different folder icons.', function (assert) {
    const directoryPathComponent = new DirectoryPath(fixture);
    const url = '#/folder/root';
    
    directoryPathComponent.showInnerFolderIcon(url);
    const anchor = fixture.querySelector(`a[href="${url}"]`);
    
    assert.ok(anchor, 'Should contain anchor link with the same href.');
    
    directoryPathComponent.showRootFolderIcon();
    const absentAnchor = fixture.getElementsByTagName('a')[0];
    
    assert.notOk(absentAnchor, 'Should not contain anchor link if is root.');
  });
});
