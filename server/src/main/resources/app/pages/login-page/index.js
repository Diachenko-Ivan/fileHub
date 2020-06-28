import {Component} from '../../component/parent-component.js';
import {LoginFormComponent} from '../../component/form-login/index.js';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service/index.js';
import {AuthenticationError} from '../../models/errors/authentication-error/index.js';
import {GeneralServerError} from '../../models/errors/server-error/index.js';
import {ToastService} from '../../services/toasts-service/index.js';
import {GeneralError} from '../../models/errors/general-error/index.js';

/**
 * Page which is designed for login form.
 */
export class LoginPage extends Component {
  _toastService = new ToastService();
  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
    this.render();
    TitleService.getInstance().setTitle('Login - FileHub');
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
  addNestedEventListeners() {
    this.loginForm.onSubmit((credentials) => {
      ApiService.getInstance().logIn(credentials)
        .then(this._onSuccessfulAuthentication)
        .catch((error) => {
          if (error instanceof AuthenticationError) {
            this.loginForm.showAuthenticationError(error.message);
          } else if (error instanceof GeneralServerError) {
            this._toastService.showErrorMessage(error.message);
          } else if (error instanceof GeneralError) {
            this._toastService.showErrorMessage(error.message);
          }
        });
    });
  }

  /**
   * Registers a handler which will be called after successful authentication.
   *
   * @param {Function} handler - callback for successful authentication.
   */
  onSuccessfulAuthentication(handler) {
    this._onSuccessfulAuthentication = handler;
  }
}
