import {FileComponent} from '../../../../app/component/file-item/file';

const {test, module} = QUnit;

export default module('FileComponent test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render file component.', function (assert) {
    const expectedFileName = 'page.txt';
    const size = 1024;
    new FileComponent(fixture, {name: expectedFileName, mimeType: 'text', size});
    const file = fixture.firstElementChild;
    
    const renderedFileName = fixture.querySelector('[data-test="file-name"]').innerText;
    const renderedFileSize = fixture.querySelector('[data-test="file-size"]').innerText;
    
    assert.ok(file, 'Should contain rendered file.');
    assert.strictEqual(renderedFileName, expectedFileName, 'Should render correct file name.');
    assert.strictEqual(renderedFileSize, '1.0 KB', 'Should render correct file size.');
  });
  
  test('should show correct file size 100 B.', function (assert) {
    testFileSize(fixture, assert, 100, '100.0 B');
  });
  
  test('should show correct file size 100 KB.', function (assert) {
    testFileSize(fixture, assert, 102400, '100.0 KB');
  });
  
  test('should show correct file size 100 MB.', function (assert) {
    testFileSize(fixture, assert, 104857600, '100.0 MB');
  });
});

function testFileSize(fixture, assert, size, expectedSize) {
  new FileComponent(fixture, {name: 'filename', mimeType: 'text', size});
  const renderedFileSize = fixture.querySelector('[data-test="file-size"]').innerText;
  assert.strictEqual(renderedFileSize, expectedSize, `Should render correct ${expectedSize}.`);
}
