import {Component} from './parent-component.js';
import {FormInput} from './form-input';
import {Button} from './button';

export class LoginFormComponent extends Component {

  /**
   * @inheritdoc
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
        <form class="application-box user-form">
            <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
            <header class="header form-header">
                <div class="form-target"><h1>Login</h1></div>
                <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
            </header>
            <div data-element="inputs"></div>
            <div class="form-footer-container">
                <div data-element="button-link" class="form-footer-button-container">
                   <a class="form-link" href="#">Don't have an account yet?</a> 
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

    this.loginInput = new FormInput(inputs,
        {
          inputId: 'login', inputType: 'text',
          inputName: 'login', inputPlaceholder: 'Login', labelText: 'Username'
        });

    this.passwordInput = new FormInput(inputs,
        {
          inputId: 'password', inputType: 'password',
          inputName: 'password', inputPlaceholder: 'Password', labelText: 'Password'
        });

    this.formButton = new Button(buttonContainer, 'form-button', 'Log In');
  }

  /**
   * @inheritdoc
   */
  addEventListener() {
    this.formButton.onClick(() => {
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
      } else
        alert(`Successfully authenticated\nEmail:${emailValue}`);
    });

    this.rootContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

  }
}
