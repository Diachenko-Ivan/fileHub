import {Component} from '../parent-component.js';
import {Icon} from './file-item-icon';

/**
 * Represents either file or folder.
 */
export class FileItem extends Component {
  /**
   * Model that stores item properties.
   *
   * @type {AbstractItemModel}
   */
  model;
  /**
   * Creates file item component.
   *
   * @param {Element} container - outer container.
   * @param {AbstractItemModel} params
   */
  constructor(container, params) {
    super(container);
    this.model = params;
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
  
  /**
   * Shows loading wheel icon when user executes any action with file item.
   */
  showLoadingWheel() {
    new Icon(this._itemName, {styleClass:'cd'});
  }
  
  /**
   * Hides loading wheel icon.
   */
  hideLoadingWheel(){
    this._itemName.removeChild(this._itemName.querySelector('[data-element="icon"]'))
  }
}
