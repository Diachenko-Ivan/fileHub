import {FileItemIcon} from '../file-item-icon';
import {FileItem} from '../index.js';

/**
 * Represents folder.
 */
export class FolderComponent extends FileItem {
  /**
   * @typedef FolderDescription
   * @property {string} name - name of folder.
   * @property {number} filesCount - number of files in folder.
   */
  /**
   * Creates new {@type FolderComponent} component.
   *
   * @param {Element} container - outer container.
   * @param {FolderDescription} folderDescription - container for folder properties.
   */
  constructor(container, folderDescription) {
    super(container);
    Object.assign(this, folderDescription);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<tr>
                <td class="arrow"><i class="glyphicon glyphicon-menu-right"></i></td>
                <td><span class="folder-name"><i class="glyphicon glyphicon-folder-close"></i>
                       <a href="#">${this.name}</a></span></td>
                    <td class="file-count">${this.filesCount}</td>
                <td data-element="file-action-icons" class="file-action-icons">
                    </td>
                </tr>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const fileActionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');

    this.uploadIcon = new FileItemIcon(fileActionIcons, {styleClass: 'upload'});
    this.removeIcon = new FileItemIcon(fileActionIcons, {styleClass: 'remove-circle'});
  }
}
