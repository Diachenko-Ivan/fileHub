import {FileItemIcon} from '../file-item-icon';
import {FileItem} from '../index.js';

/**
 * Represents file in file list.
 */
export class FileComponent extends FileItem {
  /**
   * @typedef FileDescription
   * @property {string} name - name of file.
   * @property {number} size - file size.
   * @property {string} mimeType - image, video, document.
   * @property {string} id - file id.
   * @property {string} parentId - id of parent folder.
   */
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
    other: 'file'
  };

  /**
   * Creates new {@type FileComponent} component.
   *
   * @param {Element} container - file list.
   * @param {FileDescription} fileDescription - container for file properties.
   */
  constructor(container, fileDescription) {
    super(container);
    Object.assign(this, fileDescription);
    this._defineIcon(this.mimeType);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
                <tr>
                    <td class="arrow"></td>
                    <td>
                        <span data-test="file-name" class="file-name">
                            <i class="glyphicon glyphicon-${this._iconType}"></i>
                            ${this.name}
                        </span></td>
                    <td data-test="file-size" class="file-size">${this._getSizeWithMemoryUnit(this.size)}</td>
                    <td data-element="file-action-icons" class="file-action-icons">
                    </td>
                </tr>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const fileActionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');

    this.downloadIcon = new FileItemIcon(fileActionIcons, {styleClass: 'download'});
    this.removeIcon = new FileItemIcon(fileActionIcons, {styleClass: 'remove-circle'});
  }

  /**
   * Converts bytes to string with memory units.
   *
   * @param {number} fileSizeInBytes - size in bytes.
   * @returns {string} size with memory units.
   * @private
   */
  _getSizeWithMemoryUnit(fileSizeInBytes) {
    const memoryUnits = [' KB', ' MB', ' GB'];
    let pointer = -1;
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      pointer++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + memoryUnits[pointer];
  }

  /**
   * Defines appropriate file icon.
   *
   * @param {string} mimeType - file mime type.
   * @private
   */
  _defineIcon(mimeType) {
    const iconType = Object.keys(this._fileIconTypes).find((iconType) => mimeType.startsWith(iconType));
    if (iconType) {
      this._iconType = this._fileIconTypes[iconType];
      return;
    }
    this._iconType = this._fileIconTypes.other;
  }
}
