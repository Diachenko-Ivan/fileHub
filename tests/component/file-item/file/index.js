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
    const fileComponent = new FileComponent(fixture, {name: expectedFileName, mimeType: 'text', size});
    const file = fixture.firstElementChild;

    const renderedFileName = fileComponent.rootContainer.querySelector('[data-test="file-name"]').innerText;
    const renderedFileSize = fileComponent.rootContainer.querySelector('[data-test="file-size"]').innerText;

    assert.ok(file, 'Should contain rendered file.');
    assert.strictEqual(renderedFileName, expectedFileName, 'Should render correct file name.');
    assert.strictEqual(renderedFileSize, '1.0 KB', 'Should render correct file size.');
  });
});
