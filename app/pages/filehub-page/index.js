import {Button} from '../../component/button';
import {UserDetails} from '../../component/user-details';
import {FileItemList} from '../../component/file-list';
import {StateAwareComponent} from '../../component/state-aware-component';
import {DirectoryPath} from '../../component/directory-path';
import {GetFolderContentAction} from '../../states/actions/get-folder-content-action';
import {RemoveItemAction} from '../../states/actions/remove-item-action';
import {TitleService} from '../../services/title-service';
import {UploadFileAction} from '../../states/actions/upload-file-action';
import {UploadWindowService} from '../../services/upload-window-service';
import {GetUserInfoAction} from '../../states/actions/user-info-action';
import {LogOutAction} from '../../states/actions/log-out-action';
import {AuthenticationError} from '../../models/errors/authentication-error';
import {PageNotFoundError} from '../../models/errors/page-not-found-error';
import {GeneralServerError} from '../../models/errors/server-error';
import {GetFolderAction} from '../../states/actions/get-folder-action';
import {RenameItemAction} from '../../states/actions/item-name-change-action';
import {DownloadFileAction} from '../../states/actions/download-action';
import {DownloadService} from '../../services/dowload-anchor-service';
import {CreateFolderAction} from '../../states/actions/create-folder-action';
import {FILEHUB_PAGE_URL} from '../../config/router-config';
import {ToastService} from '../../services/toasts-service';
import {RemoveStatePropertyAction} from '../../states/actions/remove-state-property-action';

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
   * Creates new instance.
   *
   * @param container - outer container.
   * @param {StateManager} stateManager - used to make operations with state.
   * @param {ToastService} toastService - service for showing pop-up messages.
   */
  constructor(container, stateManager, toastService) {
    super(container, stateManager);
    this.render();
    this._toastService = toastService;
    TitleService.getInstance().setTitle('Root - FileHub');
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `
        <section class="application-box file-explorer-container">
        <img alt="TeamDev" class="logo" src="./static/images/teamdev.png">
        <ul class="user-menu">
            <li data-element="user-info"></li>
            <li><a title="Log out" data-element="log-out" href="#">Log out <i class="glyphicon glyphicon-log-out"></i></a></li>
        </ul>
        <header class="header">
            <h1><a title="File Explorer" href="#${FILEHUB_PAGE_URL}">File Explorer</a></h1>
        </header>
        <div data-element="main" class="main">
            <div class="content-header">
                <span data-element="directory-path"></span>
                <div data-element="head-buttons" class="head-buttons">
                </div>
            </div>
            <div class="list-loader" data-element="list-loader"></div>
            <div class="file-list" data-element="file-list"></div>
        </div>
        <footer class="footer">
            <p>Copyright &copy; 2020 <a href="https://www.teamdev.com/">TeamDev</a>. All rights reserved.</p>
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
    this.progressBarContainer = this._getContainer('list-loader');
    
    this.directoryPath = new DirectoryPath(directoryPathContainer);
    this.userDetails = new UserDetails(userDetailsContainer);
    this.createFolderButton = new Button(headButtonsContainer, {
      buttonText: 'Create Folder',
      iconClass: PLUS_ICON_CLASS,
      type: 'button',
      title: 'Create Folder',
    });
    this.uploadFileButton = new Button(headButtonsContainer, {
      buttonText: 'Upload File',
      iconClass: UPLOAD_ICON_CLASS,
      type: 'button',
      title: 'Upload File',
    });
    
    this.logOutLink = this._getContainer('log-out');
    
    this.fileList = new FileItemList(this.fileListContainer);
    
    this.dispatch(new GetUserInfoAction());
  }
  
  /**
   * @inheritdoc
   */
  initState() {
    this.onStateChange('isLoading', (state) => {
      this.progressBarContainer.classList.toggle('loading', state.isLoading);
    });
    this.onStateChange('fileList', (state) => {
      this.fileList.fileList = state.fileList;
    });
    this.onStateChange('folderLoadError', (state) => {
      this._handleCommonErrors(state.folderLoadError, {
        notFoundErrorHandler: () => this._onResourceNotFound(),
        serverErrorHandler: () => this._toastService.showErrorMessage(`Server error! Failed to load folder.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('folderLoadError')));
    });
    this.onStateChange('loadError', (state) => {
      this._handleCommonErrors(state.loadError, {
        notFoundErrorHandler: () => this._onResourceNotFound(),
        serverErrorHandler: () => this._toastService.showErrorMessage(`Server error! Failed to load folder.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('loadError')));
    });
    this.onStateChange('locationParam', (state) => {
      this.dispatch(new GetFolderAction(state.locationParam.id));
      this.dispatch(new GetFolderContentAction(state.locationParam.id));
    });
    this.onStateChange('currentFolder', (state) => {
      this.uploadFileButton.isLoading = state.uploadingFolderIds.has(state.currentFolder.id);
      this.createFolderButton.isLoading = state.newFolderSource && state.newFolderSource.id === state.currentFolder.id;
      this.directoryPath.folder = state.currentFolder;
      TitleService.getInstance().setTitle(`${state.currentFolder.name} - FileHub`);
    });
    this.onStateChange('isFolderLoading', (state) => {
      if (state.isFolderLoading) {
        this.directoryPath.folder = {name: '...'};
      }
    });
    this.onStateChange('user', (state) => {
      this.userDetails.username = state.user.name;
    });
    this.onStateChange('userError', (state) => {
      this._handleCommonErrors(state.userError, {
        serverErrorHandler: () => this._toastService.showErrorMessage('Server error! Failed to get user.'),
      }, () => this.dispatch(new RemoveStatePropertyAction('userError')));
    });
    this.onStateChange('uploadingFolderIds', (state) => {
      this.uploadFileButton.isLoading = state.uploadingFolderIds.has(state.currentFolder.id);
      this.fileList.loadingItems = new Set([...state.uploadingFolderIds, ...state.removingItemIds, ...state.downloadingFileIds]);
    });
    this.onStateChange('uploadErrorObject', (state) => {
      if (!state.uploadErrorObject) {
        return;
      }
      const {model, error} = state.uploadErrorObject;
      this._handleCommonErrors(error, {
        notFoundErrorHandler: () => this._toastService.showErrorMessage(
          `Failed to upload file in ${model.name} folder. it does not exist`),
        serverErrorHandler: () => this._toastService.showErrorMessage(
          `Server error! Failed to upload file in ${model.name} folder.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('uploadErrorObject')));
    });
    this.onStateChange('removingItemIds', (state) => {
      this.fileList.loadingItems = new Set([...state.uploadingFolderIds, ...state.removingItemIds, ...state.downloadingFileIds]);
    });
    this.onStateChange('removeError', (state) => {
      this._handleCommonErrors(state.removeError, {
        serverErrorHandler: () => this._toastService.showErrorMessage('Server error! Failed to remove item.'),
      }, () => this.dispatch(new RemoveStatePropertyAction('removeError')));
    });
    this.onStateChange('downloadingFileIds', (state) => {
      this.fileList.loadingItems = new Set([...state.uploadingFolderIds, ...state.removingItemIds, ...state.downloadingFileIds]);
    });
    this.onStateChange('downloadErrorObject', (state) => {
      if (!state.downloadErrorObject) {
        return;
      }
      const {error, model} = state.downloadErrorObject;
      this._handleCommonErrors(error, {
        notFoundErrorHandler: () => {
          this._toastService.showErrorMessage(`Failed to download ${model.name} file. It does not exist.`);
          this.dispatch(new GetFolderContentAction(state.locationParam.id));
        },
        serverErrorHandler: () => this._toastService.showErrorMessage(`Failed to download ${model.name} file.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('downloadErrorObject')));
    });
    this.onStateChange('renamingItemIds', (state) => {
      this.fileList.renamingItems = state.renamingItemIds;
    });
    this.onStateChange('renameErrorObject', (state) => {
      if (!state.renameErrorObject) {
        return;
      }
      const {model, error} = state.renameErrorObject;
      this._handleCommonErrors(error, {
        notFoundErrorHandler: () => this._toastService.showErrorMessage(`Failed to rename ${model.name} item. It does not exist.`),
        serverErrorHandler: () => this._toastService.showErrorMessage(`Server error! Failed to rename ${model.name} item.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('renameErrorObject')));
    });
    this.onStateChange('newFolderSource', (state) => {
      this.createFolderButton.isLoading = state.newFolderSource === state.currentFolder;
    });
    this.onStateChange('newFolderId', (state) => {
      this.fileList.newFolder = state.newFolderId;
    });
    this.onStateChange('createFolderError', (state) => {
      this._handleCommonErrors(state.createFolderError, {
        notFoundErrorHandler: () => {
          this._toastService.showErrorMessage(
            `Failed to create new folder to ${state.newFolderSource.name}. This folder does not exist.`);
          this._onResourceNotFound();
        },
        serverErrorHandler: () => this._toastService.showErrorMessage(
          `Server error! Failed to create new folder to ${state.newFolderSource.name}.`),
      }, () => this.dispatch(new RemoveStatePropertyAction('createFolderError')));
    });
  }
  
  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    const uploadWindowService = new UploadWindowService();
    
    this.uploadFileButton.onClick(() =>
      uploadWindowService.openUploadWindow((file) =>
        this.dispatch(new UploadFileAction(this.stateManager.state.currentFolder, file))),
    );
    
    this.createFolderButton.onClick(() => this.dispatch(new CreateFolderAction()));
    
    this.fileList.onUploadFileToFolder((model) =>
      uploadWindowService.openUploadWindow((file) =>
        this.dispatch(new UploadFileAction(model, file))),
    );
    
    this.fileList.onRemoveListItem((model) => this.dispatch(new RemoveItemAction(model)));
    
    this.logOutLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.dispatch(new LogOutAction()).finally(this._redirectToLoginPage);
    });
    
    this.fileList.onDownloadFile((model) => this.dispatch(new DownloadFileAction(model, new DownloadService())));
    
    this.fileList.onFileItemNameChange((model) => this.dispatch(new RenameItemAction(model)));
  }
  
  /**
   * Registers callback for folder double click.
   *
   * @param {Function} handler - callback.
   */
  onFolderChange(handler) {
    this.fileList.onFolderDoubleClick(handler);
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
    this._redirectToLoginPage = handler;
  }
  
  /**
   * @typedef ErrorHandlers
   * @property {Function} authErrorHandler - handler for authentication error.
   * @property {Function} notFoundErrorHandler - handler for 404 error.
   * @property {Function} serverErrorHandler - handler for 500 error.
   */
  /**
   * Handles common errors in application.
   *
   * @param {Error} error - error in application.
   * @param {ErrorHandlers} errorHandlers - contains handlers for different error types.
   * @param {Function} callback - callback that is invoked after successful error handling.
   * @private
   */
  _handleCommonErrors(error, errorHandlers, callback) {
    if (!error) {
      return;
    }
    if (error instanceof AuthenticationError) {
      this._redirectToLoginPage();
    } else if (error instanceof PageNotFoundError) {
      errorHandlers.notFoundErrorHandler();
    } else if (error instanceof GeneralServerError) {
      errorHandlers.serverErrorHandler();
    }
    callback();
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

