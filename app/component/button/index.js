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
   * @typedef ButtonDescription
   * @property {string} className - button class.
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
    return `<button data-test="button" class="button ${this.className}">${this.buttonText}</button>`;
  }
  
  /**
   * @inheritdoc
   */
  initNestedComponents() {
    if (this.iconClass) {
      const buttonIcon = document.createElement('i');
      buttonIcon.setAttribute('data-test', 'button-icon');
      buttonIcon.setAttribute('class', `glyphicon glyphicon-${this.iconClass}`);
      this.rootContainer.prepend(buttonIcon);
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
  addEventListener() {
    this.rootContainer.addEventListener('click', () => this.handlers.forEach((handler) => handler()));
  }
}
