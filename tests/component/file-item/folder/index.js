import {FolderComponent} from '../../../../app/component/file-item/folder';

const {test, module} = QUnit;

export default module('FolderComponent test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render folder component.', function (assert) {
    new FolderComponent(fixture,{name:'documents', filesCount:10});
    const folder = fixture.firstElementChild;

    const numOfChildElements = 4;

    assert.ok(folder, 'Should contain rendered folder.');
    assert.strictEqual(numOfChildElements, folder.childElementCount, 'Should render correct number of table data.');
  });
});
