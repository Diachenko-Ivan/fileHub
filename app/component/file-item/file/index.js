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
   * @property {string} fileIcon - image, video, document.
   * @property {string} id - file id.
   * @property {string} parentId - id of parent folder.
   */
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
                        <span class="file-name">
                            <i class="glyphicon glyphicon-${this.fileIcon}"></i>
                            ${this.name}
                        </span></td>
                    <td class="file-size">${this.size}</td>
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
}
