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
    return `<div id="login-page"></div>`;
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
    this.loginForm.onSubmit((credentials) => {
      this.apiService.register(credentials)
        .then(() => window.location.hash = '/fileHub')
        .catch((validationError) => this.loginForm.showFieldErrors(validationError.errors));
    });
  }
}
