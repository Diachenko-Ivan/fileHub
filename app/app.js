import {Component} from './component/parent-component.js';
import {LoginFormComponent} from './pages/from-login';
import {Router} from './router.js';
import {RegistrationFormComponent} from './pages/form-registration';

/**
 * Base component for application that stores different pages.
 */
export class Application extends Component {
  /**
   * Creates new {@type Application} instance.
   *
   * @param {Element} container - outer container for current component.
   */
  constructor(container) {
    super(container);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<div id="application"></div>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const pageMapping = {
      '/login': () => new LoginFormComponent(this.rootContainer),
      '/registration': () => new RegistrationFormComponent(this.rootContainer),
    };

    this.router = new Router(this.rootContainer, pageMapping);
    this.router.defaultUrl = '/login';
  }
}
