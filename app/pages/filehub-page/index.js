import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {DirectoryPath} from '../../component/directory-path';
import {GetFolderAction} from '../../states/actions/file-list-action';
import {TitleService} from '../../services/title-service';
import {UserInfoAction} from '../../states/actions/user-info-action';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {LOGIN_PAGE_URL} from '../../config/router-config';
import {FileItemNotFoundError} from '../../models/errors/file-item-not-found';

/**
 * Page for file hub explorer.
 */
export class FileHubPage extends StateAwareComponent {
  /**
   * @inheritdoc
   */
  constructor(container, stateManager) {
    super(container, stateManager);
    this.render();
    TitleService.getInstance().setTitle('Root - FileHub');
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<section class="application-box file-explorer-container">
        <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png">
        <ul data-element="user-menu" class="user-menu">
            <li class="username"></li>
            <li><a data-element="log-out" href="#">Log out <i class="glyphicon glyphicon-log-out"></i></a></li>
        </ul>

        <header class="header file-explorer-header"><a href="#"><h1>File Explorer</h1></a></header>

        <div data-element="main" class="main">
            <div class="content-header">
                <span data-element="directory-path"></span>
                <span data-element="head-buttons" class="head-buttons">             
                </span>
            </div>
            <div data-element="progress-bar"></div>
            <div data-element="file-list"></div>
        </div>
        <footer class="footer">
            Copyright &copy; 2020 <a href="#">TeamDev</a>. All rights reserved.
        </footer>
    </section>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const userDetailsContainer = this._returnContainer('user-menu').firstElementChild;
    const headButtonsContainer = this._returnContainer('head-buttons');
    this.fileListContainer = this._returnContainer('file-list');
    const directoryPathContainer = this._returnContainer('directory-path');
    this.progressBarContainer = this._returnContainer('progress-bar');

    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer, 'Username');

    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');

    const logOutLink = this._returnContainer('log-out');

    this.fileList = new FileItemList(this.fileListContainer);

    this.dispatch(new UserInfoAction());
  }

  /**
   * @inheritdoc
   */
  initState() {
    this.onStateChange('isLoading', (state) => {
      if (state.isLoading) {
        this.progressBarContainer.innerHTML = '<h2>Loading...</h2>';
      } else {
        this.progressBarContainer.innerHTML = '';
      }
    });
    this.onStateChange('fileList', (state) => {
      this.fileList.renderFileList(state.fileList);
    });
    this.onStateChange('loadError', (state) => {
      if (state.loadError instanceof AuthenticationError) {
        window.location.hash = LOGIN_PAGE_URL;
      } else if(state.loadError instanceof FileItemNotFoundError){
        this._onResourceNotFound();
      }
    });
    this.onStateChange('locationParam', (state) => {
      this.dispatch(new GetFolderAction(state.locationParam.id));
    });
    this.onStateChange('currentFolder', (state) => {
      this.directoryPath.folderName = state.currentFolder.name;
      TitleService.getInstance().setTitle(`${state.currentFolder.name} - FileHub`);
    });
    this.onStateChange('user', (state) => {
      this.userDetails.username = state.user.name;
    });
  }

  /**
   * Registers the function that is invoked when folder is not found.
   * <p>Used by {@link Router}.
   *
   * @param {Function} handler - the function that is invoked when folder is not found.
   */
  onResourceNotFound(handler) {
    this._onResourceNotFound = () => handler();
  }

  /**
   * Returns container by data-element name.
   *
   * @param {string} dataElement - name of element.
   * @return {Element} container.
   * @private
   */
  _returnContainer(dataElement) {
    return this.rootContainer.querySelector(`[data-element="${dataElement}"]`);
  }
}

