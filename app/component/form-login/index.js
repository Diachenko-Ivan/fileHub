import {Component} from '../parent-component.js';
import {FormInput} from '../form-input';
import {FormHeader} from '../form-header';
import {FormFooter} from '../form-footer';
import CredentialValidator from '../../utils/validator.js';

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
        <form data-test="login-form" class="application-box user-form">
            <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
        </form>  
    `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this.header = new FormHeader(this.rootContainer, 'Login');

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

    this.footer = new FormFooter(this.rootContainer, 'Log In', 'Don\'t have an account yet?', '#/registration');
  }

  /**
   * Returns credentials if they are successfully validated. Else returns error.
   *
   * @return {Promise<[Promise, Promise]>} credentials if login and password successfully validated or error if not.
   */
  getCredentials() {
    this.loginInput.cleanErrorMessage();
    this.passwordInput.cleanErrorMessage();

    const loginValue = this.loginInput.inputValue;
    const passwordValue = this.passwordInput.inputValue;

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
            throw new TypeError('Validation failed.');
          }
          return {login: loginValue, password: passwordValue};
        });
  }
}
