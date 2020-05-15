import {RegistrationFormComponent} from '../../../app/component/form-registration';

const {test, module} = QUnit;

export default module('RegistrationForm test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render registration form.', function (assert) {
    new RegistrationFormComponent(fixture);
    const loginForm = fixture.firstElementChild;
    
    assert.ok(loginForm, 'Should contain rendered registration form.');
  });
});
