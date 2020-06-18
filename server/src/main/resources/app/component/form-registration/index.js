import {Component} from '../parent-component.js';
import {FormInput} from '../form-input/index.js';
import CredentialValidator from '../../services/validator/index.js';
import {UserCredentials} from '../../models/user-credentials/index.js';
import {MinLengthRule, NotEmptyRule, RegexpRule} from '../../services/validator/rules/index.js';
import {Button} from '../button/index.js';
import {LOGIN_PAGE_URL} from '../../config/router-config/index.js';

/**
 * Used for defining login input.
 *
 * @type {string}
 */
const loginField = 'login';
/**
 * Used for defining password input.
 *
 * @type {string}
 */
const passwordField = 'password';

/**
 * User registration form.
 */
export class RegistrationFormComponent extends Component {
  /**
   * Creates new {@type RegistrationFormComponent} instance.
   *
   * @param {Element} container - outer container for registration form.
   */
  constructor(container) {
    super(container);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
       <form data-test="registration-form" class="application-box form-box">
            <img alt="TeamDev" class="logo" src="./static/images/teamdev.png">
            <header class="header">
                <h1>Registration</h1>
                <i class="glyphicon glyphicon-user"></i>
            </header>
            <div data-element="inputs"></div>
            <div class="row">
                <div data-element="button-link" class="input-container">
                    <a title="Already have an account?" class="form-link" href="#${LOGIN_PAGE_URL}">
                       Already have an account?
                    </a>
                </div>
            </div>
       </form>
`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const inputs = this.rootContainer.querySelector('[data-element="inputs"]');
    const buttonContainer = this.rootContainer.querySelector('[data-element="button-link"]');

    this.loginInput = new FormInput(inputs, {
      inputId: 'login',
      inputType: 'text',
      inputName: 'login',
      inputPlaceholder: 'Login',
      labelText: 'Username',
    });

    this.passwordInput = new FormInput(inputs, {
      inputId: 'password',
      inputType: 'password',
      inputName: 'password',
      inputPlaceholder: 'Password',
      labelText: 'Password',
    });

    this.repeatPasswordInput = new FormInput(inputs, {
      inputId: 'repeatPassword',
      inputType: 'password',
      inputName: 'password',
      inputPlaceholder: 'Confirm password',
      labelText: 'Confirm Password',
    });

    this.formButton = new Button(buttonContainer, {
      buttonText: 'Register',
      type: 'submit',
      title: 'Register',
    });
  }

  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    const validator = new CredentialValidator();

    this.rootContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    this.formButton.onClick(() => {
      this.loginInput.cleanErrorMessage();
      this.passwordInput.cleanErrorMessage();
      this.repeatPasswordInput.cleanErrorMessage();

      const loginValue = this.loginInput.inputValue;
      const passwordValue = this.passwordInput.inputValue;
      const repeatPasswordValue = this.repeatPasswordInput.inputValue;

      validator.validate(
        [{
          name: loginField, value: loginValue, rules: [
            new NotEmptyRule('Login can`t be empty.'),
            new MinLengthRule(4, 'Min length 4.'),
            new RegexpRule('^([a-zA-Z0-9]){4,}$',
              'Login should have uppercase or lowercase letters and digits.')],
        }, {
          name: passwordField, value: passwordValue, rules: [
            new NotEmptyRule('Password can`t be empty.'),
            new MinLengthRule(8, 'Min length 8.'),
            new RegexpRule('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$',
              'Password should have at least one uppercase and lowercase letter and digit.')],
        }])
        .then(() => {
          if (this.confirmPasswordsEqual(passwordValue, repeatPasswordValue)) {
            this._returnCredentials(new UserCredentials(loginValue, passwordValue));
          }
        })
        .catch((errors) => this.showFieldErrors(errors));
    });
  }

  /**
   *  Checks the equivalence of password and repeat-password.
   *
   * @param {string} passwordValue - user`s password.
   * @param {string} repeatPasswordValue - user`s repeated password.
   * @return {boolean} equality of main password and repeat-password.
   */
  confirmPasswordsEqual(passwordValue, repeatPasswordValue) {
    if (passwordValue !== repeatPasswordValue) {
      this.repeatPasswordInput.showErrorMessage('Passwords are not equal.');
      return false;
    }
    return true;
  }

  /**
   * Shows errors in the result of registration.
   *
   * @param {ValidationErrorCase[]} errors - errors that are received from server or after validation.
   */
  showFieldErrors(errors) {
    const errorMap = errors.reduce((errorObj, error) => ({...errorObj, [error.field]: error.message}), {});
    this.loginInput.showErrorMessage(errorMap[loginField] || '');
    this.passwordInput.showErrorMessage(errorMap[passwordField] || '');
  }

  /**
   * Register callback that will be invoked after success credentials validation.
   *
   * @param {Function} callback - callback that will be invoked.
   */
  onSubmit(callback) {
    this._returnCredentials = callback;
  }
}


