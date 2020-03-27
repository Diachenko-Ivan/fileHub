import {Component} from '../../component/parent-component.js';
import {LoginFormComponent} from '../../component/form-login';
import {ApiService} from '../../services/api-service.js';

/**
 * Page which is designed for login form.
 */
export class LoginPage extends Component {
  apiService = new ApiService();
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
          .then((credentials) =>
            this.apiService.login(credentials)
                .then(() => {
                })
                .catch((error) => console.log(error)))
          .catch((reason) => console.log(reason));
    });
  }
}
