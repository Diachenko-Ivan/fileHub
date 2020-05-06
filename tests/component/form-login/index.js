import {LoginFormComponent} from '../../../app/component/form-login';

const {test, module} = QUnit;

export default module('LoginForm test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render login form.', function (assert) {
    new LoginFormComponent(fixture);
    const loginForm = fixture.firstElementChild;

    assert.ok(loginForm, 'Should contain rendered login form.');
  });
});
