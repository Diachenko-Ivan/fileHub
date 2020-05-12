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
   * @type {{file: (function(Item): FileComponent), folder: (function(Item): FolderComponent)}}
   * @private
   */
  _fileItemFactory = {
    file: (item) => new FileComponent(this.rootContainer.firstElementChild, item),
    folder: (item) => new FolderComponent(this.rootContainer.firstElementChild, item),
  };
  /**
   * Contains files and folders.
   *
   * @type {FileItem[]}
   * @private
   */
  _fileItems = [];
  
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
   * @param {Item[]} items - received file list.
   */
  renderFileList(items) {
    this.rootContainer.firstElementChild.innerHTML = '';
    this._fileItems.length = 0;
    this._sortedItems(items).forEach((item) => {
      const fileItem = this._fileItemFactory[item.type](item);
      this._fileItems.push(fileItem);
      if (fileItem instanceof FolderComponent) {
        fileItem.onUploadFile(this._uploadFileHandler);
      }
    });
  }
  
  /**
   * Sorts array of items alphabetically where folders go first.
   *
   * @param {Item[]} items - received file list.
   * @return {[]} sorted array where folders go first.
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
    return this._fileItems;
  }

  /**
   * Registers function that executes when user clicked to folder upload icon.
   *
   * @param {Function} handler - executes when user clicked to folder upload icon.
   */
  onUploadFileToFolder(handler) {
    this._uploadFileHandler = handler;
  }
}
