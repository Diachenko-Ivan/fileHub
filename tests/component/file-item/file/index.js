import {FileComponent} from '../../../../app/component/file-item/file';

const {test, module} = QUnit;

export default module('FileComponent test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render file component.', function (assert) {
    const expectedFileName = 'page.txt';
    const size = 20;
    const fileComponent = new FileComponent(fixture, {name: expectedFileName, mimeType: 'text', size: size});
    const file = fixture.firstElementChild;

    const renderedFileName = fileComponent.rootContainer.querySelector('[data-test="file-name"]').innerText;
    const renderedFileSize = fileComponent.rootContainer.querySelector('[data-test="file-size"]').innerText;

    assert.ok(file, 'Should contain rendered file.');
    assert.strictEqual(renderedFileName, expectedFileName, 'Should render correct file name.');
    assert.strictEqual(renderedFileSize, size.toString(), 'Should render correct file size.');
  });
});
