import {Component} from '../../component/parent-component.js';
import {RegistrationFormComponent} from '../../component/form-registration/index.js';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service/index.js';
import {GeneralServerError} from '../../models/errors/server-error/index.js';
import {ValidationError} from '../../models/errors/validation-error/index.js';
import {GeneralError} from '../../models/errors/general-error/index.js';
import {ToastService} from '../../services/toasts-service/index.js';

/**
 * Page which is designed for registration form.
 */
export class RegistrationPage extends Component {
  _toastService = new ToastService();
  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
    this.render();
    TitleService.getInstance().setTitle('Registration - FileHub');
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
    this.registrationForm = new RegistrationFormComponent(this.rootContainer);
  }

  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    this.registrationForm.onSubmit((credentials) => {
      ApiService.getInstance().register(credentials)
        .then(this._onSuccessfulRegistration)
        .catch((error) => {
          if (error instanceof ValidationError) {
            this.registrationForm.showFieldErrors(error.errors);
          } else if (error instanceof GeneralServerError) {
            this._toastService.showErrorMessage(error.message);
          } else if (error instanceof GeneralError) {
            this._toastService.showErrorMessage(error.message);
          }
        });
    });
  }

  /**
   * Registers a handler which will be called after successful registration.
   *
   * @param {Function} handler - callback for successful registration.
   */
  onSuccessfulRegistration(handler) {
    this._onSuccessfulRegistration = handler;
  }
}
