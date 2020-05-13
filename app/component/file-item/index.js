import {Component} from '../parent-component.js';

/**
 * Style class for disabling file icons.
 * @type {string}
 */
const DISABLED_ICONS_CLASS = 'is-disabled';
/**
 * Style class for showing loader.
 * @type {string}
 */
const LOADING_ITEM_CLASS = 'is-loading';

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
  
  /**
   * Adds handler on remove action.
   *
   * @param {Function} handler - callback which is called when user clicked on remove icon.
   */
  onRemoveIconClicked(handler) {
    this.removeHandler = (model) => handler(model);
  }
  
  /**
   * Adds or removes loading wheel from file item.
   *
   * @param {boolean} value - flag that defines loading state.
   */
  set isLoading(value) {
    const loader = this._itemName.querySelector('[data-element="loader"]');
    const actionIcons = this.rootContainer.querySelector('[data-element="file-action-icons"]');
    if (value) {
      loader.classList.add(LOADING_ITEM_CLASS);
      actionIcons.classList.add(DISABLED_ICONS_CLASS);
    } else {
      loader.classList.remove(LOADING_ITEM_CLASS);
      actionIcons.classList.remove(DISABLED_ICONS_CLASS);
    }
    this._isLoading = value;
  }
  
  /**
   * Defines either items is loading or not.
   *
   * @return {boolean} loading flag.
   */
  get isLoading() {
    return this._isLoading;
  }
}
