import {Component} from '../../component/parent-component.js';
import {RegistrationFormComponent} from '../../component/form-registration';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service';
import {GeneralServerError} from '../../models/errors/server-error';
import {ValidationError} from '../../models/errors/validation-error';

/**
 * Page which is designed for registration form.
 */
export class RegistrationPage extends Component {
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
  addEventListener() {
    this.registrationForm.onSubmit((credentials) => {
      ApiService.getInstance().register(credentials)
        .then(this._onSuccessfulRegistration)
        .catch((error) => {
          if (error instanceof ValidationError) {
            this.registrationForm.showFieldErrors(error.errors);
          } else if (error instanceof GeneralServerError) {
            alert(error.message);
          }
        });
    });
  }
  
  /**
   * Registers a handler which will be called after successful registration.
   *
   * @param {Function} handler - callback for successful registration.
   */
  onSuccessfulRegistration(handler){
    this._onSuccessfulRegistration = handler;
  }
}
