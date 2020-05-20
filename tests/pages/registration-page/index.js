import {RegistrationPage} from '../../../app/pages/registration-page';

const {test, module} = QUnit;

export default module('RegistrationPage test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render registration page.', function (assert) {
    new RegistrationPage(fixture);
    
    const registrationPage = fixture.firstElementChild;
    
    assert.ok(registrationPage, 'Should successfully render registration page.');
  });
});
