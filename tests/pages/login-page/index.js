import {LoginPage} from '../../../app/pages/login-page';

const {test, module} = QUnit;

export default module('LoginPage test', function (hook) {
  let fixture;
  
  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should render login page.', function (assert) {
    new LoginPage(fixture);
    
    const loginPage = fixture.firstElementChild;
    
    assert.ok(loginPage, 'Should successfully render login page.');
  });
});
