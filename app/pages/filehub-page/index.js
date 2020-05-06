import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {GetFileListAction} from '../../states/actions/file-list-action';
import {DirectoryPath} from '../../component/directory-path';
import {TitleService} from '../../services/title-service';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {LOGIN_PAGE_URL} from '../../config/router-config';

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

    this.dispatch(new GetFileListAction());
  }

  initState() {
    this.onStateChange('isLoading', (state) => {
      if (state.isLoading) {
        this.progressBarContainer.innerHTML = '<h3>Loading...</h3>';
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
      }
    });
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

