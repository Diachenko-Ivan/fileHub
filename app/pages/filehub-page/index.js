import {Component} from '../../component/parent-component.js';
import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';

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
                <i class="glyphicon glyphicon-folder-open"></i>
                <span class="directory-path">/ Root</span>
                <span data-element="head-buttons" class="head-buttons">             
                </span>
            </div>
        </div>
        <footer class="footer">
            Copyright &copy; 2020 <a href="#">TeamDev</a>. All rights reserved.
        </footer>
    </section>`;
  }


  initNestedComponents() {
    const userDetailsContainer = this.rootContainer.querySelector('[data-element="user-menu"]').firstElementChild;
    const headButtonsContainer = this.rootContainer.querySelector('[data-element="head-buttons"]');
    const fileListContainer = this.rootContainer.querySelector('[data-element="main"]');

    this.userDetails = new UserDetails(userDetailsContainer, 'Username');
    this.fileList = new FileItemList(fileListContainer,
      [{name: 'Documents', type: 'folder', filesCount: 10},
        {name:'404.html', type:'file', size:4000, mimeType:'text'}]);

    this.uploadFileButton = new Button(headButtonsContainer,
      'head-button upload', '<i class="glyphicon glyphicon-upload"></i>Upload File');
    this.createFolderButton = new Button(headButtonsContainer,
      'head-button create', '<i class="glyphicon glyphicon-plus"></i>Create Folder');
  }
}

