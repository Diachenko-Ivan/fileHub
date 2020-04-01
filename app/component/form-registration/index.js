import {Component} from '../parent-component.js';
import {FormInput} from '../form-input';
import CredentialValidator from '../../services/validator';
import {UserCredentials} from '../../models/user-credentials';
import {MinLengthRule, NotEmptyRule, RegexpRule} from '../../services/validator/rules';
import {Button} from '../button';

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
       <form data-test="registration-form" class="application-box user-form">
            <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
            <header class="header form-header">
                <div class="form-target"><h1>Registration</h1></div>
                <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
            </header>
            <div data-element="inputs"></div>
            <div class="form-footer-container">
                <div data-element="button-link" class="form-footer-button-container">
                   <a class="form-link" href="#/login">Already have an account?</a> 
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

    this.formButton = new Button(buttonContainer, 'form-button', 'Register');
  }

  /**
   * @inheritdoc
   */
  addEventListener() {
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
    errors.forEach((error) => {
          if (error.field === loginField) {
            this.loginInput.showErrorMessage(error.message);
          }
          if (error.field === passwordField) {
            this.passwordInput.showErrorMessage(error.message);
          }
        },
    );
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


