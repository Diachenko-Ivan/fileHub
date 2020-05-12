import {FileItemList} from '../../../app/component/file-list';

const {test, module} = QUnit;

export default module('FileItemList test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render file item list component.', function (assert) {
    const fileItemList = new FileItemList(fixture);
    
    fileItemList.renderFileList([{name: 'Documents', type: 'folder', filesCount: 10},
      {name: '404.html', type: 'file', size: 4000, mimeType: 'text'}]);
    
    const listTable = fixture.firstElementChild;
    const listBody = listTable.firstElementChild;
    
    const numOfFileItems = 2;
    
    assert.ok(listTable, 'Should contain rendered list.');
    assert.strictEqual(numOfFileItems, listBody.childElementCount, 'Should render correct number of file items.');
  });
  
  test('should render list that is sorted alphabetically and by folders.', function (assert) {
    const fileItemList = new FileItemList(fixture);
    const unsortedList = [
      {name: '404.html', type: 'file', size: 4000, mimeType: 'text'},
      {name: 'hello.pdf', type: 'file', size: 4000, mimeType: 'text'},
      {name: 'Tasks', type: 'folder', filesCount: 10},
      {name: 'Main.java', type: 'file', size: 4000, mimeType: 'text'},
      {name: 'Audio', type: 'folder', filesCount: 10},
      {name: 'Documents', type: 'folder', filesCount: 10}];
    const sortedList = [
      {name: 'Audio'},
      {name: 'Documents'},
      {name: 'Tasks'},
      {name: '404.html'},
      {name: 'Main.java'},
      {name: 'hello.pdf'},
    ];
    fileItemList.renderFileList(unsortedList);
    const fileItems = fileItemList.getFileItems().map((value) => {
      return {name: value.name};
    });
    assert.equal(JSON.stringify(sortedList), JSON.stringify(fileItems), 'Should render sorted list.');
  });
});
