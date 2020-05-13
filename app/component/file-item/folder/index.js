import {Icon} from '../file-item-icon';
import {FileItem} from '../index.js';
import {FolderModel} from '../../../models/item/folder';

/**
 * Represents folder.
 */
export class FolderComponent extends FileItem {
  /**
   * Creates new {@type FolderComponent} component.
   *
   * @param {Element} container - outer container.
   * @param {FolderModel} folderDescription - container for folder properties.
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
                        <a data-test="folder-name" data-element="folder-link" href="#/folder/${this.model.id}">${this.model.name}</a>
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
      this.removeHandler(this.model);
    });
  }
  
  /**
   * Returns readable string with number of file items.
   *
   * @return {string} string with number of file items.
   * @private
   */
  _numberOfItems() {
    return `${this.model.filesCount} ${this.model.filesCount === 1 ? 'item' : 'items'}`;
  }
}
