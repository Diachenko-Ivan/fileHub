import {Component} from '../parent-component.js';
import {FormInput} from '../form-input';
import {FormHeader} from '../form-header';
import {FormFooter} from '../form-footer';
import CredentialValidator from '../../utils/validator.js';
import {UserCredentials} from '../../models/user-credentials';

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
        </form>  
`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this.header = new FormHeader(this.rootContainer, 'Registration');

    this.loginInput = new FormInput(this.rootContainer, {
      inputId: 'login',
      inputType: 'text',
      inputName: 'login',
      inputPlaceholder: 'Login',
      labelText: 'Username',
    });

    this.passwordInput = new FormInput(this.rootContainer, {
      inputId: 'password',
      inputType: 'password',
      inputName: 'password',
      inputPlaceholder: 'Password',
      labelText: 'Password',
    });

    this.repeatPasswordInput = new FormInput(this.rootContainer, {
      inputId: 'repeatPassword',
      inputType: 'password',
      inputName: 'password',
      inputPlaceholder: 'Confirm password',
      labelText: 'Confirm Password',
    });

    this.footer = new FormFooter(this.rootContainer, 'Register', 'Already have an account?', '#/login');
  }

  /**
   * Returns credentials if they are successfully validated. Else returns error.
   *
   * @return {Promise<[Promise, Promise]>} credentials if login and password successfully validated or error if not.
   */
  getCredentials() {
    this.loginInput.cleanErrorMessage();
    this.passwordInput.cleanErrorMessage();
    this.repeatPasswordInput.cleanErrorMessage();

    const loginValue = this.loginInput.inputValue;
    const passwordValue = this.passwordInput.inputValue;
    const repeatPasswordValue = this.repeatPasswordInput.inputValue;

    const validator = new CredentialValidator();
    return Promise.allSettled([validator.validate(loginValue, validator.Pattern.LOGIN),
      validator.validate(passwordValue, validator.Pattern.PASSWORD)])
        .then(([loginValidation, passwordValidation]) => {
          if (loginValidation.status === 'rejected' || passwordValidation.status === 'rejected') {
            if (loginValidation.status === 'rejected') {
              this.loginInput.showErrorMessage(loginValidation.reason.message);
            }
            if (passwordValidation.status === 'rejected') {
              this.passwordInput.showErrorMessage(passwordValidation.reason.message);
            }
          } else {
            if (this.confirmPasswordsEqual(passwordValue, repeatPasswordValue)) {
              return new UserCredentials(loginValue, passwordValue);
            }
          }
          throw new TypeError('Validation failed.');
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
   *
   * @param {ValidationError} validationError
   */
  showServerErrors(validationError) {
    validationError.errors.forEach((error) => {
      if (error.field === 'login') {
        this.loginInput.showErrorMessage(error.message);
      }
      if (error.field === 'password') {
        this.passwordInput.showErrorMessage(error.message);
      }
    },
    );
  }
}


