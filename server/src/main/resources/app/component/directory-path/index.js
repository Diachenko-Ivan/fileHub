import {Component} from '../parent-component.js';
import {FolderModel} from '../../models/item/folder/index.js';

/**
 * Represents a field for folder name and navigation icon.
 */
export class DirectoryPath extends Component {
  /**
   * Folder model for directory path.
   *
   * @type {FolderModel}
   * @private
   */
  _folder;

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
    return `<div class="path-title ${this.getRootElementClasses({_isLoading: 'is-loading', _isInner: 'is-inner'})}">
              <a class="nav-icon-link" title="Level up" href="#/folder/${this._folder ? this._folder.parentId : ''}">
              <i class="glyphicon glyphicon-level-up"></i></a>
              <i class="glyphicon glyphicon-folder-close"></i>
              <div data-element="loader" class="item-loader"></div>
              <strong class="directory-path" data-element="folder-name">/ ${this._folder ? this._folder.name : ''}</strong>
            </div>`;
  }

  /**
   * Sets new folder info to path title.
   *
   * @param {FolderDescription} folder - folder model.
   */
  set folder(folder) {
    this._folder = folder;
    this._isInner = !!folder.parentId;
    this.rerender();
  }

  /**
   * Defines either directory path is loading or not
   *
   * @param {boolean} value - loading or not.
   */
  set isLoading(value) {
    this._isLoading = value;
    this.rerender();
  }
}
