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
   * @inheritdoc
   */
  addEventListener() {
    const input = this.rootContainer.querySelector('input');
    this.rootContainer.addEventListener('click', (event) => {
      if (event.detail === 1) {
        this._onClick(this.model.id);
      }
    });
    
    input.addEventListener('blur', () => {
      this._onClick();
    });
    
    input.addEventListener('change', () => {
      this.model.name = input.value;
      this._onNameChange(this.model);
    });
    
    input.addEventListener('click', (event) => event.stopPropagation());
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
  
  onNameChange(handler) {
    this._onNameChange = handler;
  }
  
  set isEditing(value) {
    const input = this.rootContainer.querySelector('input');
    this._isEditing = value;
    this._itemName.classList.toggle('editing', value);
    input.value = this.model.name;
    input.focus();
  }
  
  /**
   * Defines either row is selected or not.
   *
   * @param {boolean} value - selected or not.
   */
  set isSelected(value) {
    this._isSelected = value;
    this.rootContainer.classList.toggle('isSelected', value);
  }
  
  set isRenaming(value) {
    this._isRenaming = value;
    this.rootContainer.querySelector('[data-test="name"]').innerHTML = '';
    this.isLoading = value;
  }
  
  onClick(handler) {
    this._onClick = handler;
  }
}
