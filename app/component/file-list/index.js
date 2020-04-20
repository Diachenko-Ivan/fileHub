import {Component} from '../parent-component.js';
import {FolderComponent} from '../file-item/folder';
import {FileComponent} from '../file-item/file';

/**
 * Represents the list of files and folders.
 */
export class FileItemList extends Component {
  /**
   * Contains either file or folder.
   *
   * @type {{file: (function(Item): FileComponent), folder: (function(Item): FolderComponent)}}
   * @private
   */
  _fileItem = {
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
    this._sortedItems(items).forEach((item) => {
      const fileItem = this._fileItem[item.type](item);
      fileItem.onFirstClick(() => {
        if (this._currentSelected) {
          this._currentSelected.isSelected = false;
          this._currentSelected.isEditing = false;
        }
        this._currentSelected = fileItem;
      });
      fileItem.onNameChange((model) => {
        this._onFileItemNameChange(model);
      });
    });
  }

  /**
   * Sorts array of items where folders go first.
   *
   * @param {Item[]} items - received file list.
   * @return {[]} sorted array where folders go first.
   * @private
   */
  _sortedItems(items) {
    const sortedArray = [];
    items.forEach((item) => {
      if (item.type === 'folder') {
        sortedArray.unshift(item);
      } else {
        sortedArray.push(item);
      }
    });
    return sortedArray;
  }

  onFileItemNameChange(handler) {
    this._onFileItemNameChange = (model) => handler(model);
  }
}
