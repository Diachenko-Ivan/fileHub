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
              <a title="Level up" href="#"><i data-element="nav-icon" class="glyphicon glyphicon-folder-open"></i></a>
              <strong class="directory-path" data-element="folder-name">/ Shared with me</strong>
            </div>`;
  }

  /**
   * Makes icon to be level up.
   * @param {string} url - url of parent folder.
   */
  setInnerFolderIcon(url) {
    const fakeDiv = document.createElement('div');
    fakeDiv.innerHTML = `<a title="Level up" href="${url}">
                            <i data-element="nav-icon" class="glyphicon glyphicon-level-up"></i>
                         </a>`;
    this.rootContainer.removeChild(this.rootContainer.firstElementChild);
    this.rootContainer.prepend(fakeDiv.firstElementChild);
  }

  /**
   * Makes icon to be folder open.
   */
  setRootFolderIcon() {
    const fakeDiv=document.createElement('div');
    fakeDiv.innerHTML='<i data-element="nav-icon" class="glyphicon glyphicon-folder-open">';
    this.rootContainer.removeChild(this.rootContainer.firstElementChild);
    this.rootContainer.prepend(fakeDiv.firstElementChild);
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
