import {Component} from '../../component/parent-component.js';
import {FormInput} from '../../component/form-input';
import {FormHeader} from '../../component/form-header';
import {FormFooter} from '../../component/form-footer';

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
   * @inheritdoc
   */
  addEventListener() {
    this.footer.formButton.onClick(() => {
      this.loginInput.cleanErrorMessage();
      this.passwordInput.cleanErrorMessage();

      const emailValue = this.loginInput.inputValue;
      const passwordValue = this.passwordInput.inputValue;
      if (!emailValue || !passwordValue) {
        if (!emailValue) {
          this.loginInput.showErrorMessage('Username can\'t be empty');
        }
        if (!passwordValue) {
          this.passwordInput.showErrorMessage('Password can\'t be empty and should contain letters and numbers');
        }
      } else {
        alert(`Successfully authenticated\nEmail:${emailValue}`);
      }
    });

    this.rootContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
