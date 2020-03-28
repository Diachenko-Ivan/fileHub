import {Button} from '../../../app/component/button';

const {test, module} = QUnit;

export default module('Button test', function (hook) {

  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should show button', function (assert) {
    new Button(fixture, 'form-button', 'Login');
    const button = document.querySelector('[data-test="button"]');
    assert.ok(button, 'Should contain rendered button.');
  });

  test('should call click handler on button click', function (assert) {
    const component = new Button(fixture, 'form-button', 'Login');
    component.onClick(() => assert.step('Clicked'));

    const button = fixture.firstElementChild;
    button.click();

    assert.verifySteps(['Clicked'], 'Should successfully click on button.');
  });
});
