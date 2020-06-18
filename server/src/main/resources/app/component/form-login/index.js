import {Component} from '../parent-component.js';
import {FormInput} from '../form-input/index.js';
import CredentialValidator from '../../services/validator/index.js';
import {UserCredentials} from '../../models/user-credentials/index.js';
import {MinLengthRule, NotEmptyRule, RegexpRule} from '../../services/validator/rules/index.js';
import {Button} from '../button/index.js';
import {REGISTRATION_PAGE_URL} from '../../config/router-config/index.js';

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
 * User login form.
 */
export class LoginFormComponent extends Component {
  /**
   * Creates new {@type LoginFormComponent} instance.
   *
   * @param {Element} containers - outer container for login form.
   */
  constructor(...containers) {
    super(...containers);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
        <form data-test="login-form" class="application-box form-box">
            <img alt="TeamDev" class="logo" src="./static/images/teamdev.png">
            <header class="header">
                <h1>Login</h1>
                <i class="glyphicon glyphicon-user"></i>
            </header>
            <div class="auth-error-message" data-element="auth-error-message"></div>
            <div data-element="inputs"></div>
            <div class="row">
                <div data-element="button-link" class="input-container">
                    <a title="Don't have an account yet?" class="form-link" href="#${REGISTRATION_PAGE_URL}">
                        Don't have an account yet?
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

    this._authenticationErrormessage = this.rootContainer.querySelector('[data-element="auth-error-message"]');

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

    this.formButton = new Button(buttonContainer, {
      buttonText: 'Log In',
      title: 'Log In',
      type: 'submit',
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
      this._authenticationErrormessage.classList.remove('shown');

      const loginValue = this.loginInput.inputValue;
      const passwordValue = this.passwordInput.inputValue;
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
          this._returnCredentials(new UserCredentials(loginValue, passwordValue));
        })
        .catch((error) => this.showFieldErrors(error));
    });
  }

  /**
   * Sets error message if user`s authentication failed.
   *
   * @param {string} message - error message after failed authentication.
   */
  showAuthenticationError(message) {
    this._authenticationErrormessage.classList.add('shown');
    this._authenticationErrormessage.innerText = message;
  }

  /**
   * Shows errors in the result of login.
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
