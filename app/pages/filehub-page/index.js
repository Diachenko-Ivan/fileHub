import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {DirectoryPath} from '../../component/directory-path';
import {GetFolderContentAction} from '../../states/actions/get-folder-content-action';
import {TitleService} from '../../services/title-service';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {LOGIN_PAGE_URL} from '../../config/router-config';
import {PageNotFoundError} from '../../models/errors/page-not-found-error';
import {GeneralServerError} from '../../models/errors/server-error';
import {GetFolderAction} from '../../states/actions/get-folder-action';

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
        <ul class="user-menu">
            <li data-element="user-info" class="username"></li>
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
    const userDetailsContainer = this._getContainer('user-info');
    const headButtonsContainer = this._getContainer('head-buttons');
    this.fileListContainer = this._getContainer('file-list');
    const directoryPathContainer = this._getContainer('directory-path');
    this.progressBarContainer = this._getContainer('progress-bar');
    
    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer, {username: 'Username'});
    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');
    
    const logOutLink = this._getContainer('log-out');
    
    this.fileList = new FileItemList(this.fileListContainer);
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
    this.onStateChange('folderLoadError', (state) => {
      this._solveLoadError(state);
    });
    this.onStateChange('loadError', (state) => {
      this._solveLoadError(state);
    });
    this.onStateChange('locationParam', (state) => {
      this.dispatch(new GetFolderAction(state.locationParam.id));
      this.dispatch(new GetFolderContentAction(state.locationParam.id));
    });
    this.onStateChange('currentFolder', (state) => {
      this.directoryPath.generatePathInfo(state.currentFolder);
      TitleService.getInstance().setTitle(`${state.currentFolder.name} - FileHub`);
    });
    this.onStateChange('isFolderLoading', (state) => {
      if (state.isFolderLoading) {
        this.directoryPath.generatePathInfo({name: '...'});
      }
    });
  }
  
  /**
   * Registers the function that is invoked when folder is not found.
   *
   * @param {Function} handler - callback for not found error.
   */
  onResourceNotFound(handler) {
    this._onResourceNotFound = handler;
  }
  
  /**
   * Registers handler that is called when authorization error is raised.
   *
   * @param {Function} handler - callback.
   */
  onFailedAuthorization(handler) {
    this._onFailedAuthorization = handler;
  }
  
  /**
   * Resolves error type.
   *
   * @param {FileListState} state - common application state.
   * @private
   */
  _solveLoadError(state){
    const loadError = state.loadError;
    if (loadError instanceof AuthenticationError) {
      this._onFailedAuthorization();
    } else if (loadError instanceof PageNotFoundError) {
      this._onResourceNotFound();
    } else if (loadError instanceof GeneralServerError) {
      alert(state.loadError.message);
    }
  }
  /**
   * Returns container by data-element name.
   *
   * @param {string} dataElement - name of element.
   * @return {Element} container.
   * @private
   */
  _getContainer(dataElement) {
    return this.rootContainer.querySelector(`[data-element="${dataElement}"]`);
  }
}

