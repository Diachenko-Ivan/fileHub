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
    file: (item) => new FileComponent(this.rootContainer.firstElementChild, item),
    folder: (item) => new FolderComponent(this.rootContainer.firstElementChild, item),
  };
  /**
   * Contains files and folders.
   *
   * @type {AbstractItemModel[]}
   * @private
   */
  _fileItems = [];
  /**
   * Contains items that are being changed(renamed or deleted).
   *
   * @type {string[]}
   * @private
   */
  _loadingItemIds = [];
  
  /**
   * @typedef Item
   * @property {string} name - file or folder name.
   * @property {string} type - folder or file.
   * @property {string} mimeType - file mime type.
   * @property {number} size - file size.
   * @property {number} filesCount - number of files in folder.
   * @property {string} id - id of folder or file.
   * @property {string} parentId - id of parent folder.
   */
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
   * Shows the list of file items.
   *
   * @param {AbstractItemModel[]} items - received file list.
   */
  renderFileList(items) {
    this.rootContainer.firstElementChild.innerHTML = '';
    this._fileItems.length = 0;
    this._sortedItems(items).forEach((item) => {
      const fileItem = this._fileItemFactory[item.type](item);
      this._fileItems.push(fileItem);
      fileItem.onRemoveIconClicked(this._removeListItemHandler);
    });
    this.showLoadingItems(this._loadingItemIds);
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
   * @param {string[]} changingItemIds - list of item ids that are being changed.
   */
  showLoadingItems(changingItemIds) {
    const tmpChangingItemIds = changingItemIds.slice(0);
    this._loadingItemIds
      .map((id) => this._fileItems.find((item) => item.id === id))
      .forEach((changingItem) => {
        if (changingItem.isLoading()) {
          changingItem.hideLoadingWheel();
        }
      });
    this._loadingItemIds.length = 0;
    tmpChangingItemIds
      .map((id) => this._fileItems.find((item) => item.id === id))
      .forEach((changingItem) => {
        changingItem.showLoadingWheel();
        this._loadingItemIds.push(changingItem.id);
      });
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
   * @return {AbstractItemModel[]} list of rendered file item components.
   */
  getFileItems() {
    return this._fileItems;
  }
}
