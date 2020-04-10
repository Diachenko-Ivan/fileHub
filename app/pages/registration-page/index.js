import {Component} from '../../component/parent-component.js';
import {RegistrationFormComponent} from '../../component/form-registration';
import {ApiService} from '../../services/api-service.js';
import {TitleService} from '../../services/title-service';

/**
 * Page which is designed for registration form.
 */
export class RegistrationPage extends Component {
  apiService = new ApiService();

  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
    this.render();
    TitleService.getInstance().setTitle('Registration - FileHub')
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
      this.apiService.register(credentials)
        .then(() => window.location.hash = '/login')
        .catch((validationError) => this.registrationForm.showFieldErrors(validationError.errors));
    });
  }
}
