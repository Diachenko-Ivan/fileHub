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
                            <i class="glyphicon glyphicon-${this._fileIconTypes[this.mimeType]}"></i>
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
    this.removeIcon.onClick(() => {
      this.removeHandler({
        name: this.name,
        size: this.size,
        type: 'file',
        id: this.id,
        parentId: this.parentId,
        mimeType: this.mimeType
      });
    });
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

}
