import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {DirectoryPath} from '../../component/directory-path';
import {GetFolderContentAction} from '../../states/actions/get-folder-content-action';
import {TitleService} from '../../services/title-service';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {PageNotFoundError} from '../../models/errors/page-not-found-error';
import {GeneralServerError} from '../../models/errors/server-error';
import {GetFolderAction} from '../../states/actions/get-folder-action';

/**
 * Class name for upload icon.
 * @type {string}
 */
const UPLOAD_ICON_CLASS = 'upload';
/**
 * Class name for plus icon.
 * @type {string}
 */
const PLUS_ICON_CLASS = 'plus';

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
    this.uploadFileButton = new Button(headButtonsContainer, {
      buttonText: 'Upload File',
      className: 'head-button upload',
      iconClass: UPLOAD_ICON_CLASS,
    });
    this.createFolderButton = new Button(headButtonsContainer, {
      buttonText: 'Create Folder',
      className: 'head-button create',
      iconClass: PLUS_ICON_CLASS,
    });
    
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
      this._handleLoadError(state.folderLoadError);
    });
    this.onStateChange('loadError', (state) => {
      this._handleLoadError(state.loadError);
    });
    this.onStateChange('locationParam', (state) => {
      this.dispatch(new GetFolderAction(state.locationParam.id));
      this.dispatch(new GetFolderContentAction(state.locationParam.id));
    });
    this.onStateChange('currentFolder', (state) => {
      this.directoryPath.folder = state.currentFolder;
      TitleService.getInstance().setTitle(`${state.currentFolder.name} - FileHub`);
    });
    this.onStateChange('isFolderLoading', (state) => {
      if (state.isFolderLoading) {
        this.directoryPath.folder = {name: '...'};
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
   * Handles error with concrete type.
   *
   * @param {Error} loadError - folder or folder content load error.
   * @private
   */
  _handleLoadError(loadError) {
    if (loadError instanceof AuthenticationError) {
      this._onFailedAuthorization();
    } else if (loadError instanceof PageNotFoundError) {
      this._onResourceNotFound();
    } else if (loadError instanceof GeneralServerError) {
      alert(loadError.message);
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

