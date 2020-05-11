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
    new FolderComponent(fixture, {name: folderName, filesCount: filesCount});
    const folder = fixture.firstElementChild;
    
    const renderedFolderName = fixture.querySelector('[data-test="folder-name"]').innerText;
    const renderedFilesCount = fixture.querySelector('[data-test="file-count"]').innerText;
    
    assert.ok(folder, 'Should contain rendered folder.');
    assert.strictEqual(renderedFolderName, folderName, 'Should render correct folder name.');
    assert.strictEqual(renderedFilesCount, `${filesCount.toString()} items`, 'Should render correct files count.');
  });
  
  test('should render correct plural form of files count.', function (assert) {
    const filesCount = 2;
    new FolderComponent(fixture, {name: 'docs', filesCount: filesCount});
    
    const renderedFilesCount = fixture.querySelector('[data-test="file-count"]').innerText;
    assert.strictEqual(renderedFilesCount, `${filesCount.toString()} items`, 'Should render files count with "items".');
  });
  
  test('should render correct single form of files count.', function (assert) {
    const filesCount = 1;
    new FolderComponent(fixture, {name: 'docs', filesCount: filesCount});
    
    const renderedFilesCount = fixture.querySelector('[data-test="file-count"]').innerText;
    assert.strictEqual(renderedFilesCount, `${filesCount.toString()} item`, 'Should render files count with "item".');
  });
  
  test('should show and hide loading wheel.', function (assert) {
    const file = new FolderComponent(fixture, {name: 'sas'});
    file.showLoadingWheel();
    const loadIcon = fixture.querySelector('[data-element="item-name"] [data-element="icon"]');
    assert.ok(loadIcon, 'Should render loading wheel.');
    
    file.hideLoadingWheel();
    const absentLoadIcon = fixture.querySelector('[data-element="item-name"] [data-element="icon"]');
    assert.notOk(absentLoadIcon, 'Should remove loading wheel.');
  });
  
  test('should call remove handler if remove icon is clicked.', function (assert) {
    const file = new FolderComponent(fixture, {name: 'sas'});
    
    const removeIcon = fixture.querySelector('[data-element="file-action-icons"]').lastElementChild;
    file.onRemoveIconClicked(() => assert.step('Remove icon clicked'));
    
    removeIcon.click();
    assert.verifySteps(['Remove icon clicked'], 'Should call remove handler if remove icon is clicked.');
  });
});
