import {Component} from '../parent-component.js';
import {FolderComponent} from '../file-item/folder';
import {FileComponent} from '../file-item/file';

/**
 * Represents the list of files and folders.
 */
export class FileItemList extends Component {
  /**
   * Contains icon classes for each file type.
   *
   * @type {{image: string, text: string, audio: string, video: string}}
   * @private
   */
  _fileIconTypes = {
    image: 'picture',
    text: 'book',
    audio: 'music',
    video: 'film',
  };
  /**
   * Contains either file or folder.
   *
   * @type {{file: (function(Item): FileComponent), folder: (function(Item): FolderComponent)}}
   * @private
   */
  _fileItem = {
    file: (item) => new FileComponent(this.rootContainer.firstElementChild, {
      name: item.name,
      size: item.size,
      fileIcon: this._fileIconTypes[item.mimeType],
    }),
    folder: (item) => new FolderComponent(this.rootContainer.firstElementChild, {
      name: item.name,
      filesCount: item.filesCount,
    }),
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
   * @param {Item[]} items - received from server file list.
   */
  renderFileList(items) {
    this.rootContainer.firstElementChild.innerHTML = '';
    items.forEach((item) => this._fileItem[item.type](item));
  }
}
