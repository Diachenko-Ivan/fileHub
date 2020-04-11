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
    this.navigationIcon = this.rootContainer.querySelector('[data-element="nav-icon"]');
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<div class="path-title">
              <a title="Level up" href="#"><i data-element="nav-icon" class="glyphicon glyphicon-folder-open"></i></a>
              <strong class="directory-path" data-element="folder-name">/ Shared with me</strong>
            </div>`;
  }

  /**
   * Makes icon to be level up.
   */
  setInnerFolderIcon() {
    this.navigationIcon.setAttribute('class', 'glyphicon glyphicon-level-up');
  }

  /**
   * Makes icon to be folder open.
   */
  setRootFolderIcon() {
    this.navigationIcon.setAttribute('class', 'glyphicon glyphicon-folder-close');
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
