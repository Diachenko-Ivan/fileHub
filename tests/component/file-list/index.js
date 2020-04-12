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

  test('should delete the list of file items.', function (assert) {
    const fileItemList = new FileItemList(fixture);

    fileItemList.renderFileList([{name: 'Documents', type: 'folder', filesCount: 10},
      {name: '404.html', type: 'file', size: 4000, mimeType: 'text'}]);

    const listTable = fixture.firstElementChild;
    const listBody = listTable.firstElementChild;

    const numOfFileItems = 2;
    assert.strictEqual(numOfFileItems, listBody.childElementCount, 'Should render correct number of file items.');

    fileItemList.eraseFileList();

    const numOfFileItemsAfterDeletion = 0;
    assert.strictEqual(numOfFileItemsAfterDeletion, listBody.childElementCount, 'Should delete list of file items.');
  });
});
