import {Component} from '../../component/parent-component.js';
import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {DirectoryPath} from '../../component/directory-path';
import {TitleService} from '../../services/title-service';

/**
 * Page for file hub explorer.
 */
export class FileHubPage extends Component {
  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
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
            <div data-element="file-list"></div>
        </div>
        <footer class="footer">
            Copyright &copy; 2020 <a href="#">TeamDev</a>. All rights reserved.
        </footer>
    </section>`;
  }


  initNestedComponents() {
    const userDetailsContainer = this._returnContainer('user-menu').firstElementChild;
    const headButtonsContainer = this._returnContainer('head-buttons');
    this.fileListContainer = this._returnContainer('file-list');
    const directoryPathContainer = this._returnContainer('directory-path');

    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer, 'Username');
    this.fileList = new FileItemList(this.fileListContainer);
    this.fileList.renderFileList([{name: 'Documents', type: 'folder', filesCount: 10},
      {name: '404.html', type: 'file', size: 4000, mimeType: 'text'}]);

    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');
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

