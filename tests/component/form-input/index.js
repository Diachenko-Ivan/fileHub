import {FormInput} from '../../../app/component/form-input';

const {test, module} = QUnit;

export default module('FormInput test', function (hook) {
  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render form input with correct attributes.', function (assert) {
    new FormInput(fixture, {
      inputId: '1',
      inputName: 'login',
      inputType: 'text',
      inputPlaceholder: 'Login',
      labelText: 'Login',
    });
    const formInput = fixture.firstElementChild;
    const inputField = formInput.querySelector('input');
    assert.ok(formInput, 'Should contain rendered input.');
    assert.strictEqual('1', inputField.getAttribute('id'), 'Should return correct id.');
    assert.strictEqual('login', inputField.getAttribute('name'), 'Should return correct name.');
    assert.strictEqual('text', inputField.getAttribute('type'), 'Should return correct type.');
    assert.strictEqual('Login', inputField.getAttribute('placeholder'), 'Should return correct placeholder.');
    assert.strictEqual('Login', formInput.querySelector('label').innerText, 'Should return correct label.');
  });

  test('should render error message.', function (assert) {
    const component = new FormInput(fixture, {
      inputId: '1',
      inputName: 'login',
      inputType: 'text',
      inputPlaceholder: 'Login',
      labelText: 'Login',
    });
    component.showErrorMessage('Error');

    const errorMessage = fixture.querySelector('[data-test="error-message"]');
    assert.strictEqual('Error', errorMessage.innerText, 'Should render error message.');

    component.cleanErrorMessage();
    assert.strictEqual('', errorMessage.innerText, 'Should clean error message.');
  });
});
