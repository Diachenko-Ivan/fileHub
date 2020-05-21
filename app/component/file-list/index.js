import {Component} from '../parent-component.js';
import {FolderComponent} from '../file-item/folder';
import {FileComponent} from '../file-item/file';

/**
 * Represents the list of files and folders.
 */
export class FileItemList extends Component {
  /**
   * Contains functions that return file or folder component depending on type.
   *
   * @type {{file: (function(FileModel): FileComponent), folder: (function(FolderModel): FolderComponent)}}
   * @private
   */
  _fileItemFactory = {
    file: (item) => {
      return new FileComponent(this.rootContainer.firstElementChild, item);
    },
    folder: (item) => {
      const folder = new FolderComponent(this.rootContainer.firstElementChild, item);
      folder.onUploadFile(this._uploadFileHandler);
      return folder;
    },
  };
  /**
   * Contains files and folders.
   *
   * @type {FileItem[]}
   * @private
   */
  _fileItemComponents = [];
  /**
   * Contains list of loading items.
   *
   * @type {Set<string>}
   * @private
   */
  _loadingItemIds = new Set();
  /**
   * Contains list of item models.
   *
   * @type {AbstractItemModel[]}
   * @private
   */
  _itemModels = [];
  
  /**
   * Creates new {@type FileList} component.
   *
   * @param {Element} container - outer container.
   */
  constructor(container) {
    super(container);
    this.render();
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `<table data-element="file-list" class="content-table">
                <tbody>
                </tbody>
            </table>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this._sortedItems(this._itemModels).forEach((item) => {
      const fileItem = this._fileItemFactory[item.type](item);
      this._fileItemComponents.push(fileItem);
      fileItem.onRemoveIconClicked(this._removeListItemHandler);
      fileItem.onNameChange(this._onFileItemNameChange);
      fileItem.onClick(this._onItemClick);
      fileItem.isLoading = this._loadingItemIds.has(fileItem.model.id);
    });
  }
  
  /**
   * Shows the list of file items.
   *
   * @param {AbstractItemModel[]} items - received file list.
   */
  set fileList(items) {
    this.rootContainer.firstElementChild.innerHTML = '';
    this._fileItemComponents = [];
    this._itemModels = items;
    this.initNestedComponents();
  }
  
  /**
   * Adds handler on remove file item action.
   *
   * @param {Function} handler - executed when delete action is called.
   */
  onRemoveListItem(handler) {
    this._removeListItemHandler = handler;
  }
  
  /**
   * Moves the list of concrete items in process loading state.
   *
   * @param {Set<string>} loadingItemIds - list of item ids that are being changed.
   */
  set loadingItems(loadingItemIds) {
    this._loadingItemIds = loadingItemIds;
    this._fileItemComponents.forEach((item) => item.isLoading = loadingItemIds.has(item.model.id));
  }
  
  /**
   * Sorts array of items alphabetically where folders go first.
   *
   * @param {AbstractItemModel[]} items - received file list.
   * @return {AbstractItemModel[]} sorted array where folders go first.
   * @private
   */
  _sortedItems(items) {
    const files = [];
    const folders = [];
    const sortByNameFunction = (firstItem, secondItem) => {
      if (firstItem.name < secondItem.name) {
        return -1;
      }
      return 1;
    };
    items.forEach((item) => {
      if (item.type === 'folder') {
        folders.push(item);
      } else {
        files.push(item);
      }
    });
    folders.sort(sortByNameFunction);
    files.sort(sortByNameFunction);
    return [...folders, ...files];
  }
  
  /**
   * Returns list of rendered file item components.
   *
   * @return {FileItem[]} list of rendered file item components.
   */
  getFileItems() {
    return this._fileItemComponents;
  }
  
  /**
   * Registers function that executes when user clicked to folder upload icon.
   *
   * @param {Function} handler - callback for upload action.
   */
  onUploadFileToFolder(handler) {
    this._uploadFileHandler = handler;
  }
  
  onFileItemNameChange(handler) {
    this._onFileItemNameChange = (model) => handler(model);
  }
  
  onItemClick(handler) {
    this._onItemClick = handler;
  }
  
  set selectedItem(value) {
    this._processItem('_selectedItemComponent', 'isSelected', value);
  }
  
  set editingItem(value) {
    this._processItem('_editingItemComponent', 'isEditing', value);
  }
  
  set renamingItem(value) {
    this._processItem('_renamingItemComponent', 'isRenaming', value);
  }
  
  _processItem(processingItem, propertySetter, value) {
    if (this[processingItem]) {
      this[processingItem][propertySetter] = false;
    }
    this[processingItem] = this._fileItemComponents.find((v) => v.model.id === value);
    if (this[processingItem]) {
      this[processingItem][propertySetter] = true;
    }
  }
}
