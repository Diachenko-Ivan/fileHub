import {Component} from './component/parent-component.js';
import {Router} from './router.js';
import {RegistrationPage} from './pages/registration-page';
import {LoginPage} from './pages/login-page';
import {FileHubPage} from './pages/filehub-page';

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
      '/login': () => new LoginPage(this.rootContainer),
      '/registration': () => new RegistrationPage(this.rootContainer),
      '/fileHub': () => new FileHubPage(this.rootContainer),
    };

    this.router = new Router(this.rootContainer, pageMapping);
    this.router.defaultUrl = '/login';
  }
}
