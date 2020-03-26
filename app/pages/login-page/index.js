import {Component} from '../../component/parent-component.js';
import {LoginFormComponent} from '../../component/form-login';

/**
 * Page which is designed for login form.
 */
export class LoginPage extends Component {
  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<div id="registration-page"></div>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this.loginForm = new LoginFormComponent(this.rootContainer);
  }

  /**
   * @inheritdoc
   */
  addEventListener() {
    this.loginForm.rootContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      this.loginForm.getCredentials()
          .then((credentials) => console.log(credentials))
          .catch((reason) => console.log(reason));
    });
  }
}
