import {Component} from '../../component/parent-component.js';
import {LoginFormComponent} from '../../component/form-login';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service';

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
    new TitleService().setTitle('Login - FileHub')
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
