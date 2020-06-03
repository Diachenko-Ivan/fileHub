import {Component} from '../parent-component.js';


/**
 * Style class for disabling file icons.
 * @type {string}
 */
const DISABLED_BUTTON_CLASS = 'is-disabled';
/**
 * Style class for showing loader.
 * @type {string}
 */
const LOADING_BUTTON_CLASS = 'is-loading';

/**
 * Component that represents a simple button.
 */
export class Button extends Component {
  /**
   * Event handlers for button.
   *
   * @type {Function[]}
   */
  handlers = [];
  
  /**
   * @typedef ButtonDescription
   * @property {string} title - button title.
   * @property {string} type - button type.
   * @property {string} buttonText - text in button.
   * @property {string} iconClass - class of button icon if such exists.
   */
  /**
   * Creates new {@type Button} instance.
   *
   * @param {Element} container - outer container for button.
   * @param {ButtonDescription} buttonDescription - button configuration.
   */
  constructor(container, buttonDescription) {
    super(container);
    Object.assign(this, buttonDescription);
    this.render();
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `<button title="${this.title}" type="${this.type}" data-test="button"
                class="button ${this.getRootElementClasses({_isLoading: `${LOADING_BUTTON_CLASS} ${DISABLED_BUTTON_CLASS}`})}">
                <div data-element="loader" class="item-loader"></div>
                    ${this.buttonText}
            </button>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    if (this.iconClass) {
      this.buttonIcon = document.createElement('i');
      this.buttonIcon.setAttribute('data-test', 'button-icon');
      this.buttonIcon.setAttribute('class', `glyphicon glyphicon-${this.iconClass}`);
      this.rootContainer.prepend(this.buttonIcon);
    }
  }
  
  /**
   * Add custom handler for button 'onclick' event.
   *
   * @param {Function} handler - function that is going to be executed on click event.
   */
  onClick(handler) {
    this.handlers.push(handler);
  }
  
  /**
   *@inheritdoc
   */
  addRootContainerEventListeners() {
    this.rootContainer.addEventListener('click', () => this.handlers.forEach((handler) => handler()));
  }
  
  /**
   * Sets button in loading state.
   *
   * @param {boolean} value - either button is loading or not.
   */
  set isLoading(value) {
    this._isLoading = value;
    this.rerender();
  }
}
