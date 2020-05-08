import {Component} from '../parent-component.js';
import {Icon} from './file-item-icon';

/**
 * Represents either file or folder.
 */
export class FileItem extends Component {
  /**
   * Creates file item component.
   *
   * @param {Element} container - outer container.
   * @param {FileDescription | FolderDescription} params
   */
  constructor(container, params) {
    super(container);
    Object.assign(this, params);
    this.render();
    this._itemName = this.rootContainer.querySelector('[data-element="item-name"]');
  }
  
  /**
   * @inheritdoc
   */
  render() {
    const fakeComponent = document.createElement('tbody');
    fakeComponent.innerHTML = this.markup();
    this.rootContainer = fakeComponent.firstElementChild;
    this.container.append(this.rootContainer);
    this.initNestedComponents();
    this.addEventListener();
  }
}
