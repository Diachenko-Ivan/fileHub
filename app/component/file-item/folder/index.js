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
   * @property {string} id - folder id.
   * @property {string} parentId - id of parent folder.
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
                <td data-element="item-name">
                    <span class="folder-name">
                        <i class="glyphicon glyphicon-folder-close"></i>
                        <a data-test="folder-name" data-element="folder-link" href="#/folder/${this.id}">${this.name}</a>
                    </span>
                </td>
                <td data-test="file-count" class="file-count">${this.filesCount}</td>
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

  /**
   * @inheritdoc
   */
  addEventListener() {
    let timeout;
    this._fileName = this.rootContainer.querySelector('[data-element="item-name"]');
    this._fileName.addEventListener('click', () => {
      this.handleClick();
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
    this._isEditing = value;
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
