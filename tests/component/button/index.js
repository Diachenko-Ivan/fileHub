import {Button} from '../../../app/component/button';

const {test, module} = QUnit;

export default module('Button test', function (hook) {
  
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should show button', function (assert) {
    const buttonText = 'Hello';
    new Button(fixture, {buttonText, iconClass: 'glyphicon-plus'});
    const button = fixture.querySelector('[data-test="button"]');
    const icon = button.querySelector('[data-test="button-icon"]');
    assert.ok(button, 'Should contain rendered button.');
    assert.strictEqual(button.innerText, buttonText, 'Should render correct button text.');
    assert.ok(icon, 'Should render button icon if it is assigned in config.');
  });
  
  test('should call click handler on button click', function (assert) {
    const component = new Button(fixture, {buttonText: 'Hello', iconClass: 'glyphicon-plus'});
    component.onClick(() => assert.step('Clicked'));
    
    const button = fixture.firstElementChild;
    button.click();
    
    assert.verifySteps(['Clicked'], 'Should successfully click on button.');
  });
});
