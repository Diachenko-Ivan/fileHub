import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {DirectoryPath} from '../../component/directory-path';
import {GetFolderAction} from '../../states/actions/file-list-action';

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
            <div data-element="file-list">
            </div>     
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
    const userDetailsContainer = this.rootContainer.querySelector('[data-element="user-menu"]').firstElementChild;
    const headButtonsContainer = this.rootContainer.querySelector('[data-element="head-buttons"]');

    this.fileListContainer = this.rootContainer.querySelector('[data-element="file-list"]');
    this.progressBarContainer = this.rootContainer.querySelector('[data-element="progress-bar"]');

    const directoryPathContainer = this.rootContainer.querySelector('[data-element="directory-path"]');

    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer, 'Username');

    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');

    this.fileList = new FileItemList(this.fileListContainer);
  }

  /**
   * @inheritdoc
   */
  initState() {
    this.onStateChange('isLoading', (state) => {
      if (state.isLoading) {
        this.fileList.eraseFileList();
        this.progressBarContainer.innerHTML = '<h2>Loading...</h2>';
      } else {
        this.progressBarContainer.innerHTML = '';
      }
    });
    this.onStateChange('fileList', (state) => {
      this.fileList.renderFileList(state.fileList);
    });
    this.onStateChange('loadError', (state) => {
      // if (state.loadError instanceof FileItemNotFoundError) {
      //   this.directoryPath.folderName = state.loadError.message;
      // }
    });
    this.onStateChange('locationParam', (state) => {
      this.dispatch(new GetFolderAction(state.locationParam.id));
    });
    this.onStateChange('currentFolder', (state) => {
      this.directoryPath.folderName = state.currentFolder.name;
    });
  }
}

