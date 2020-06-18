import {Icon} from '../file-item-icon/index.js';
import {AbstractItemComponent} from '../index.js';
import {FileModel} from '../../../models/item/file/index.js';


/**
 * Contains icon classes for each file type.
 *
 * @type {{image: string, text: string, audio: string, video: string}}
 * @private
 */
const FILE_ICON_TYPES = {
  image: 'picture',
  text: 'book',
  audio: 'music',
  video: 'film',
  other: 'file',
};

/**
 * Represents file in file list.
 */
export class FileComponent extends AbstractItemComponent {
  /**
   * Creates new {@type FileComponent} component.
   *
   * @param {Element} container - file list.
   * @param {FileModel} fileDescription - container for file properties.
   */
  constructor(container, fileDescription) {
    super(container, fileDescription);
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
                <tr class="item-row ${this.getRootElementClasses(
    {_isLoading: 'is-loading', _isEditing: 'editing', _isRenaming: 'is-renaming', _isSelected: 'is-selected'})}">
                    <td class="cell-arrow"></td>
                    <td class="cell-file-name" data-element="item-name">
                        <i class="glyphicon glyphicon-${this._defineIcon(this.model.mimeType)}"></i>
                        <span data-test="file-name" class="name">
                            ${this.model.name}</span>
                        <input data-element="input" class="input"/>
                        <div data-element="loader" class="item-loader"></div>
                        <div class="rename-loader"><div></div><div></div><div></div></div>
                    </td>
                    <td data-test="file-size" class="cell-count">${this._getSizeWithMemoryUnit(this.model.size)}</td>
                    <td data-element="file-action-icons" class="cell-action-icons">
                    </td>
                </tr>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const fileActionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');

    this.downloadIcon = new Icon(fileActionIcons, {styleClass: 'download', title: 'Download file'});
    this.removeIcon = new Icon(fileActionIcons, {styleClass: 'remove-circle', title: 'Remove file'});
  }

  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    super.addNestedEventListeners();

    this.downloadIcon.onClick(() => this._onDownload(this.model));

    this.removeIcon.onClick(() => this.removeHandler(this.model));
  }

  /**
   * Converts bytes to string with memory units.
   *
   * @param {number} fileSizeInBytes - size in bytes.
   * @return {string} size with memory units.
   * @private
   */
  _getSizeWithMemoryUnit(fileSizeInBytes) {
    const memoryUnits = [' B', ' KB', ' MB', ' GB'];
    let pointer = 0;
    while (fileSizeInBytes >= 1024) {
      fileSizeInBytes = fileSizeInBytes / 1024;
      pointer++;
    }
    return fileSizeInBytes.toFixed(1) + memoryUnits[pointer];
  }

  /**
   * Defines appropriate file icon.
   *
   * @param {string} mimeType - file mime type.
   * @return {string} file icon class name.
   * @private
   */
  _defineIcon(mimeType) {
    const iconTypeByMimeType = Object.keys(FILE_ICON_TYPES).find((iconType) => mimeType.startsWith(iconType));
    const iconTypeKey = iconTypeByMimeType || 'other';
    return FILE_ICON_TYPES[iconTypeKey];
  }

  /**
   * Registers a handler that is called when download icon is clicked.
   *
   * @param {Function} handler - callback for download.
   */
  onDownloadFile(handler) {
    this._onDownload = handler;
  }

  /**
   * Returns input from component markup.
   *
   * @return {Element} input.
   * @private
   */
  get input() {
    return this.rootContainer.querySelector('[data-element="input"]');
  }
}
