import {Component} from '../parent-component.js';
import {Icon} from '../file-item/file-item-icon';

/**
 * Class name for inner folder icon.
 *
 * @type {string}
 */
export const LEVEL_UP_ICON_CLASS = 'level-up';
/**
 * Class name for root folder icon.
 *
 * @type {string}
 */
export const OPEN_FOLDER_ICON_CLASS = 'folder-open';
/**
 * Represents a field for folder name and navigation icon.
 */
export class DirectoryPath extends Component {
  /**
   * @inheritdoc
   */
  constructor(container) {
    super(container);
    this.render();
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `<div class="path-title">
              <span data-element="nav-icon"></span>
              <strong class="directory-path" data-element="folder-name">/</strong>
            </div>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this._navigationIconContainer = this.rootContainer.querySelector('[data-element="nav-icon"]');
    new Icon(this._navigationIconContainer, {styleClass: OPEN_FOLDER_ICON_CLASS});
  }
  
  /**
   * Sets new folder info to path title.
   *
   * @param {FolderDescription} folder - folder model.
   */
  set folder(folder) {
    if (folder.parentId) {
      this._showInnerIconWithAnchor(folder.parentId);
    } else {
      this._showRootIcon();
    }
    this.rootContainer.querySelector('[data-element="folder-name"]').innerText = `/ ${folder.name}`;
  }
  
  /**
   * Shows "level-up" icon wrapped in anchor.
   *
   * @param {string} href - url of parent folder.
   * @private
   */
  _showInnerIconWithAnchor(href) {
    const existentAnchor = this.rootContainer.querySelector('a');
    if (existentAnchor) {
      existentAnchor.setAttribute('href', href);
    } else {
      const anchor = document.createElement('a');
      anchor.setAttribute('title', 'Level up');
      anchor.setAttribute('href', `#/folder/${href}`);
      this._navigationIconContainer.removeChild(this._navigationIconContainer.firstElementChild);
      this._navigationIconContainer.append(anchor);
      new Icon(anchor, {styleClass: LEVEL_UP_ICON_CLASS});
    }
  }
  
  /**
   * Deletes anchor and shows simple root folder icon.
   *
   * @private
   */
  _showRootIcon() {
    const existentAnchor = this.rootContainer.querySelector('a');
    if (existentAnchor) {
      this._navigationIconContainer.removeChild(existentAnchor);
      new Icon(this._navigationIconContainer, {styleClass: OPEN_FOLDER_ICON_CLASS});
    }
  }
}
