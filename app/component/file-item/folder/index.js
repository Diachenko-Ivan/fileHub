import {Icon} from '../file-item-icon';
import {FileItem} from '../index.js';

/**
 * Represents folder.
 */
export class FolderComponent extends FileItem {
  /**
   * @typedef FolderDescription
   * @property {string} name - name of folder.
   * @property {number} filesCount - number of files in folder.
   * @property {string} id - folder id.
   * @property {string} parentId - id of parent folder.
   * @property {string} type - folder.
   */
  /**
   * Creates new {@type FolderComponent} component.
   *
   * @param {Element} container - outer container.
   * @param {FolderDescription} folderDescription - container for folder properties.
   */
  constructor(container, folderDescription) {
    super(container, folderDescription);
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `<tr>
                <td class="arrow"><i class="glyphicon glyphicon-menu-right"></i></td>
                <td class="cell-file-name" data-element="item-name">
                    <i class="glyphicon glyphicon-folder-close"></i>
                    <span class="folder-name">
                        <a data-test="folder-name" data-element="folder-link" href="#/folder/${this.id}">${this.name}</a>
                    </span>
                    <input class="edit-input"/>
                </td>
                <td data-test="file-count" class="file-count">${this._numberOfItems()}</td>
                <td data-element="file-action-icons" class="file-action-icons">
                    </td>
                </tr>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const fileActionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');
    
    this.uploadIcon = new Icon(fileActionIcons, {styleClass: 'upload'});
    this.removeIcon = new Icon(fileActionIcons, {styleClass: 'remove-circle'});
  }
  
  /**
   * @inheritdoc
   */
  addEventListener() {
    this.removeIcon.onClick(() => {
      this.removeHandler(this.modelForRemove);
    });
  }
  
  /**
   * Returns readable string with number of file items.
   *
   * @return {string} string with number of file items.
   * @private
   */
  _numberOfItems() {
    return `${this.filesCount} ${this.filesCount === 1 ? 'item' : 'items'}`;
  }
}
