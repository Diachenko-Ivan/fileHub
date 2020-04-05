import {FileComponent} from '../../../../app/component/file-item/file';

const {test, module} = QUnit;

export default module('FileComponent test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render file component.', function (assert) {
    new FileComponent(fixture,{name:'page.txt', fileIcon:'book', size:20});
    const file = fixture.firstElementChild;

    const numOfChildElements = 4;

    assert.ok(file, 'Should contain rendered file.');
    assert.strictEqual(numOfChildElements, file.childElementCount, 'Should render correct number of table data.');
  });
});
