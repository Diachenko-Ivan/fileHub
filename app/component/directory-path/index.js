import {Component} from '../parent-component.js';

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
              <i data-element="nav-icon" class="glyphicon glyphicon-folder-open"></i>
              <strong class="directory-path" data-element="folder-name">/ Shared with me</strong>
            </div>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    this.navigationIcon = document.querySelector('[data-element="nav-icon"]');
  }
  
  /**
   * Makes icon to be level up.
   * @param {string} url - url of parent folder.
   */
  showInnerFolderIcon(url) {
    this._createAnchor(url);
    this._changeIconClass(true);
  }
  
  /**
   * Makes icon to be folder open.
   */
  showRootFolderIcon() {
    this._deleteAnchor();
    this._changeIconClass(false);
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
      anchor.setAttribute('href', href);
      this.navigationIcon.parentNode.insertBefore(anchor, this.navigationIcon);
      anchor.append(this.navigationIcon);
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
      const icon = existentAnchor.firstElementChild;
      this.rootContainer.removeChild(existentAnchor);
      this.rootContainer.prepend(icon);
    }
  }
  
  /**
   * Changes navigation icon class.
   *
   * @param {boolean} isLevelUp - defines either icon is "level-up" or simple "open-folder".
   * @private
   */
  _changeIconClass(isLevelUp) {
    const levelUpClass = 'glyphicon-level-up';
    const openFolderClass = 'glyphicon-folder-open';
    this.navigationIcon.classList.remove(openFolderClass, levelUpClass);
    if (isLevelUp) {
      this.navigationIcon.classList.add(levelUpClass);
    } else {
      this.navigationIcon.classList.add(openFolderClass);
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
