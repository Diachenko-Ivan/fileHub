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
                    <div data-element="loader" class="item-loader"></div>
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
    this.uploadIcon.onClick(() => {
      this._onUploadFile(this.model);
    });
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

  /**
   * @inheritdoc
   */
  addEventListener() {
    let timeout;
    this._fileName = this.rootContainer.querySelector('[data-element="item-name"]');
    this._fileName.addEventListener('click', () => {
      timeout = this.handleClick();
    });
    this._fileName.addEventListener('dblclick', () => {
      clearTimeout(timeout);
      clearTimeout(timeout - 1);
      window.location.hash = `/folder/${this.id}`;
    });
  }

  /**
   * @inheritdoc
   */
  onSecondClick() {
    const input = this._fileName.querySelector('input');
    input.value = this.name;
    input.addEventListener('change', () => {
      this.name = input.value;
      const {name, id, parentId, type, filesCount} = this;
      this._onNameChange({name, id, parentId, type, filesCount});
    });
    input.addEventListener('click', (event)=>{
      event.stopPropagation();
    })
  }

  /**
   * @inheritdoc
   */
  set isEditing(value){
    super.isEditing = value;
    this._fileName.innerHTML = '';
    if (value) {
      this._fileName.innerHTML = `
            <span class="folder-name">
                <i class="glyphicon glyphicon-folder-close"></i>
                <span class="file-name-editing">
                    <input class="input edit-input" value="${this.name}">
                </span>
            </span>`;
    } else {
      this._fileName.innerHTML = `
            <span class="folder-name">
                <i class="glyphicon glyphicon-folder-close"></i>
                <a data-test="folder-name" data-element="folder-link" href="#/folder/${this.id}">${this.name}</a>
            </span>`;
    }
  }
}
