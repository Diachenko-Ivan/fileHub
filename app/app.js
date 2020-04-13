import {Component} from './component/parent-component.js';
import {Router} from './router.js';
import {RegistrationPage} from './pages/registration-page';
import {LoginPage} from './pages/login-page';
import {FileHubPage} from './pages/filehub-page';
import {ErrorPage} from './pages/error-page';
import {StateManager} from './states/state-manager';
import {ApiService} from './services/api-service.js';
import {FileListState} from './states/model/file-list-state';
import {LOGIN_PAGE_URL} from './config/router-config';
import {DynamicRouteChangeAction} from './states/actions/dynamic-route-change-action';


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
    const fileListState = new FileListState();
    const stateManager = new StateManager(fileListState, ApiService.getInstance());

    const pageMapping = {
      '/login': () => new LoginPage(this.rootContainer),
      '/registration': () => new RegistrationPage(this.rootContainer),
      '/folder/:id': () => new FileHubPage(this.rootContainer, stateManager),
      '/404': () => new ErrorPage(this.rootContainer, 404, 'Sorry, this page was not found.'),
    };

    this.router = new Router(window, this.rootContainer, pageMapping);
    this.router.onDynamicPartChange((staticPart, requestParam) =>
      stateManager.dispatch(new DynamicRouteChangeAction(staticPart, requestParam)));
    this.router.defaultUrl = LOGIN_PAGE_URL;
  }
}
