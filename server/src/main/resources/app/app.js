import {Component} from './component/parent-component.js';
import {Router} from './router.js';
import {RegistrationPage} from './pages/registration-page/index.js';
import {LoginPage} from './pages/login-page/index.js';
import {FileHubPage} from './pages/filehub-page/index.js';
import {ErrorPage} from './pages/error-page/index.js';
import {StateManager} from './states/state-manager/index.js';
import {ApiService} from './services/api-service.js';
import {FileListState} from './states/model/file-list-state/index.js';
import {
  FILEHUB_PAGE_URL,
  FILEHUB_PAGE_URL_TEMPLATE,
  LOGIN_PAGE_URL,
  NOT_FOUND_PAGE_URL,
  REGISTRATION_PAGE_URL,
} from './config/router-config/index.js';
import {DynamicRouteChangeAction} from './states/actions/dynamic-route-change-action/index.js';
import {ToastService} from './services/toasts-service/index.js';


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
      [LOGIN_PAGE_URL]: (router) => {
        const loginPage = new LoginPage(this.rootContainer);
        loginPage.onSuccessfulAuthentication(() => router.redirectTo(FILEHUB_PAGE_URL));
        return loginPage;
      },
      [REGISTRATION_PAGE_URL]: (router) => {
        const registrationPage = new RegistrationPage(this.rootContainer);
        registrationPage.onSuccessfulRegistration(() => router.redirectTo(LOGIN_PAGE_URL));
      },
      [FILEHUB_PAGE_URL_TEMPLATE]: (router) => {
        const fileHubPage = new FileHubPage(this.rootContainer, stateManager, new ToastService());
        fileHubPage.onResourceNotFound(() => router.renderNotFoundPage());
        fileHubPage.onFailedAuthorization(() => router.redirectTo(LOGIN_PAGE_URL));
        fileHubPage.onFolderChange((id) => router.redirectTo(`/folder/${id}`) );
        return fileHubPage;
      },
      [NOT_FOUND_PAGE_URL]: () => new ErrorPage(this.rootContainer),
    };

    this.router = Router.builder()
      .appContainer(this.rootContainer)
      .window(window)
      .pageMapping(pageMapping)
      .defaultUrl(FILEHUB_PAGE_URL)
      .onDynamicHashChange((staticPart, requestParam) =>
        stateManager.dispatch(new DynamicRouteChangeAction(staticPart, requestParam)))
      .build();
  }
}
