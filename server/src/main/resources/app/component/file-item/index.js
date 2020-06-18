import {Component} from '../parent-component.js';

/**
 * Represents either file or folder.
 */
export class AbstractItemComponent extends Component {
  /**
   * Model that stores item properties.
   *
   * @type {AbstractItemModel}
   */
  model;
  /**
   * Tag name of fake element.
   *
   * @type {string}
   * @private
   */
  _fakeElementTag = 'tbody'
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
  }

  /**
   * @inheritdoc
   */
  addNestedEventListeners() {
    const input = this.input;

    input.addEventListener('blur', () => {
      this.isEditing = false;
      this.isSelected = false;
    });

    input.addEventListener('change', () => {
      if (this.model.type === 'folder') {
        this.model.name = input.value;
      } else {
        this.model.name = `${input.value}.${this.model.name.split('.')[1]}`;
      }
      input.blur();
      this._onNameChange(this.model);
    });

    input.addEventListener('click', (event) => event.stopPropagation());
  }

  /**
   * @inheritdoc
   */
  addRootContainerEventListeners() {
    this.rootContainer.addEventListener('click', (event) => {
      if (event.detail !== 1) {
        return;
      }
      this._onClick();
    });
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
    this._isLoading = value;
    this.rerender();
  }

  /**
   * Registers handler for item name change.
   *
   * @param {Function} handler - callback that is called when item name is changed.
   */
  onNameChange(handler) {
    this._onNameChange = handler;
  }

  /**
   * Defines either row is editing or not.
   *
   * @param {boolean} value - editing or not.
   */
  set isEditing(value) {
    this._isEditing = value;
    this.rerender();
    const input = this.input;
    if (this.model.type === 'folder') {
      input.value = this.model.name;
    } else {
      input.value = this.model.name.split('.')[0];
    }
    input.focus();
  }

  /**
   * Defines either item is editing or not.
   *
   * @return {boolean} flag of editing state.
   */
  get isEditing() {
    return this._isEditing;
  }

  /**
   * Defines either row is selected or not.
   *
   * @param {boolean} value - selected or not.
   */
  set isSelected(value) {
    this._isSelected = value;
    this.rerender();
  }

  /**
   * Defines either item is selected or not.
   *
   * @return {boolean} flag of selected state.
   */
  get isSelected() {
    return this._isSelected;
  }

  /**
   * Defines either row is renaming or not.
   *
   * @param {boolean} value - renaming or not.
   */
  set isRenaming(value) {
    this._isRenaming = value;
    this.rerender();
  }

  /**
   * Registers handler that is called when user clicked on item.
   *
   * @param {Function} handler - handler for item click.
   */
  onClick(handler) {
    this._onClick = handler;
  }
}
