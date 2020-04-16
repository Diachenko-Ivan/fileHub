import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {GetFileListAction} from '../../states/actions/file-list-action';
import {DirectoryPath} from '../../component/directory-path';
import {TitleService} from '../../services/title-service';

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
            <li><a href="#">Log out <i class="glyphicon glyphicon-log-out"></i></a></li>
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
    this.progressBarContainer = this.rootContainer.querySelector('[data-element="progress-bar"]');

    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer, 'Username');

    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');

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

    });
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

