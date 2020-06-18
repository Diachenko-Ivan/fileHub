import {Icon} from '../file-item-icon/index.js';
import {AbstractItemComponent} from '../index.js';
import {FolderModel} from '../../../models/item/folder/index.js';

/**
 * Represents folder.
 */
export class FolderComponent extends AbstractItemComponent {
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
    return `
            <tr class="item-row ${this.getRootElementClasses(
    {_isLoading: 'is-loading', _isEditing: 'editing', _isRenaming: 'is-renaming', _isSelected: 'is-selected'})}">
                <td class="cell-arrow">
                    <i class="glyphicon glyphicon-menu-right"></i>
                </td>
                <td class="cell-file-name" data-element="item-name">
                    <i class="glyphicon glyphicon-folder-close"></i>
                    <span class="name" data-test="name">
                        <a data-test="folder-name" title="${this.model.name}" data-element="folder-link" 
                        href="#/folder/${this.model.id}">${this.model.name}</a>
                    </span>
                    <input data-element="input" class="input"/>
                    <div data-element="loader" class="item-loader"></div>
                    <div class="rename-loader"><div></div><div></div><div></div></div>
                </td>
                <td data-test="file-count" class="cell-count">${this._numberOfItems()}</td>
                <td data-element="file-action-icons" class="cell-action-icons">
                </td>
            </tr>`;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const fileActionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');
    this.folderLink = this.rootContainer.querySelector('[data-element="folder-link"]');

    this.uploadIcon = new Icon(fileActionIcons, {styleClass: 'upload', title: 'Upload file'});
    this.removeIcon = new Icon(fileActionIcons, {styleClass: 'remove-circle', title: 'Remove folder'});
  }

  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    super.addNestedEventListeners();

    this.removeIcon.onClick(() => this.removeHandler(this.model));
    this.uploadIcon.onClick(() => this._onUploadFile(this.model));

    this.folderLink.addEventListener('click', (event) => event.stopPropagation());
  }

  /**
   * @inheritdoc
   */
  addRootContainerEventListeners() {
    super.addRootContainerEventListeners();

    this.rootContainer.addEventListener('dblclick', () => this._onDoubleClick(this.model.id));
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
