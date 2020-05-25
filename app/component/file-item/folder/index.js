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
    return `<tr class="row">
                <td class="arrow"><i class="glyphicon glyphicon-menu-right"></i></td>
                <td class="cell-file-name" data-element="item-name">
                    <i class="glyphicon glyphicon-folder-close"></i>
                    <span class="folder-name" data-test="name">
                        <a data-test="folder-name" data-element="folder-link" href="#/folder/${this.model.id}">${this.model.name}</a>
                    </span>
                    <input class="edit-input"/>
                    <div data-element="loader" class="item-loader"></div>
                    <div class="rename-loader"><div></div><div></div><div></div></div>
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
    this.folderLink = this.rootContainer.querySelector('[data-element="folder-link"]');
    
    this.uploadIcon = new Icon(fileActionIcons, {styleClass: 'upload'});
    this.removeIcon = new Icon(fileActionIcons, {styleClass: 'remove-circle'});
  }
  
  /**
   * @inheritdoc
   */
  addEventListener() {
    super.addEventListener();
    
    this.removeIcon.onClick(() => {
      this.removeHandler(this.model);
    });
    this.uploadIcon.onClick(() => {
      this._onUploadFile(this.model);
    });
    
    this.rootContainer.addEventListener('dblclick', () => this._onDoubleClick(this.model.id));
    
    this.folderLink.addEventListener('click', (event) => event.stopPropagation());
  }
  
  /**
   * Registers handler for folder double click event.
   *
   * @param {Function} handler - handler for folder double click.
   */
  onDoubleClick(handler) {
    this._onDoubleClick = handler;
  }
  
  /**
   * Registers function that executes when user clicked to folder upload icon.
   *
   * @param {Function} handler - executes when user clicked to folder upload icon.
   */
  onUploadFile(handler) {
    this._onUploadFile = (id) => handler(id);
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
