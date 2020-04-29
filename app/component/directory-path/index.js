import {Component} from '../parent-component.js';
import {LEVEL_UP_ICON_CLASS, OPEN_FOLDER_ICON_CLASS} from '../../config/icon-config';
import {Icon} from '../file-item/file-item-icon';

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
    this.navigationIconContainer = this.rootContainer.querySelector('[data-element="nav-icon"]');
    new Icon(this.navigationIconContainer, {styleClass: OPEN_FOLDER_ICON_CLASS});
  }
  
  /**
   * Generates path info - icon and current folder name.
   *
   * @param {FolderDescription} folder - folder model.
   */
  generatePathInfo(folder) {
    if (folder.parentId) {
      this._createAnchor(folder.id);
    } else {
      this._deleteAnchor();
    }
    this.folderName = folder.name;
  }
  
  /**
   * Creates new anchor around navigation icon.
   *
   * @param {string} href - url of parent folder.
   * @private
   */
  _createAnchor(href) {
    const existentAnchor = this.rootContainer.querySelector('a');
    if (existentAnchor) {
      existentAnchor.setAttribute('href', href);
    } else {
      const anchor = document.createElement('a');
      anchor.setAttribute('title', 'Level up');
      anchor.setAttribute('href', `#/folder/${href}`);
      this.navigationIconContainer.removeChild(this.navigationIconContainer.firstElementChild);
      this.navigationIconContainer.append(anchor);
      new Icon(anchor, {styleClass: LEVEL_UP_ICON_CLASS});
    }
  }
  
  /**
   * Deletes anchor around navigation icon.
   *
   * @private
   */
  _deleteAnchor() {
    const existentAnchor = this.rootContainer.querySelector('a');
    if (existentAnchor) {
      this.navigationIconContainer.removeChild(existentAnchor);
      new Icon(this.navigationIconContainer, {styleClass: OPEN_FOLDER_ICON_CLASS});
    }
  }
  
  /**
   * Sets new folder name.
   *
   * @param {string} name - folder name.
   */
  set folderName(name) {
    this.rootContainer.querySelector('[data-element="folder-name"]').innerText = `/ ${name}`;
  }
}
