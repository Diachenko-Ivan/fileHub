import {Component} from '../parent-component.js';

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
   * Creates new {@type Button} instance.
   *
   * @param {Element} container - outer container for button.
   * @param {string} className - value for class attribute.
   * @param {string} buttonText - value for inner button text.
   */
  constructor(container, className, buttonText) {
    super(container);
    this._className = className;
    this._buttonText = buttonText;
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<button data-test="button" class="button ${this._className}">${this._buttonText}</button>`;
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
  addEventListener() {
    this.rootContainer.addEventListener('click', () => this.handlers.forEach((handler) => handler()));
  }
}
