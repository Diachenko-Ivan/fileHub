import {Icon} from '../../../../app/component/file-item/file-item-icon';

const {test, module} = QUnit;

export default module('FileItemIcon test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should show icon.', function (assert) {
    new Icon(fixture, {styleClass:'book'});
    const icon = fixture.querySelector('i');
    assert.ok(icon, 'Should contain rendered icon.');
  });

  test('should call click handler on icon click.', function (assert) {
    const component = new Icon(fixture, {styleClass:'book'});
    component.onClick(() => assert.step('Clicked'));

    const icon = fixture.firstElementChild;
    icon.click();

    assert.verifySteps(['Clicked'], 'Should successfully click on icon.');
  });
});
