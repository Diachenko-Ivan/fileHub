import {Component} from './component/parent-component.js';
import {Router} from './router.js';
import {RegistrationPage} from './pages/registration-page';
import {LoginPage} from './pages/login-page';
import {FileHubPage} from './pages/filehub-page';
import {ErrorPage} from './pages/error-page';
import {MockServer} from './services/mock-server.js';

const defaultUrl = '/login';

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
    new MockServer();
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
      '/404': () => new ErrorPage(this.rootContainer, 404, 'Sorry, this page was not found.'),
    };

    this.router = new Router(window, this.rootContainer, pageMapping);
    this.router.defaultUrl = defaultUrl;
  }
}
