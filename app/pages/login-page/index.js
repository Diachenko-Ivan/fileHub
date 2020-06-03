import {Component} from '../../component/parent-component.js';
import {LoginFormComponent} from '../../component/form-login';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {GeneralServerError} from '../../models/errors/server-error';

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
            alert(error.message);
          }
        });
    });
  }
  
  /**
   * Registers a handler which will be called after successful authentication.
   *
   * @param {Function} handler - callback for successful authentication.
   */
  onSuccessfulAuthentication(handler){
    this._onSuccessfulAuthentication = handler;
  }
}
