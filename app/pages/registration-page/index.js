import {Component} from '../../component/parent-component.js';
import {RegistrationFormComponent} from '../../component/form-registration';

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
    this.registrationForm.rootContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      this.registrationForm.getCredentials()
          .then((credentials) => console.log(credentials))
          .catch((reason) => console.log(reason));
    });
  }
}
