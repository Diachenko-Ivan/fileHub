import {Component} from '../parent-component.js';

/**
 * Used for user forms as credentials input.
 */
export class FormInput extends Component {
  /**
   * @typedef {object} InputAttributesDescriptor
   * @property {string} inputId id for input.
   * @property {string} inputType type for input
   * @property {string} inputName name for input
   * @property {string} inputPlaceholder placeholder for input
   * @property {string} labelText text for input label.
   */
  /**
   * Creates new @type {FormInput} instance.
   *
   * @param {Element} container outer container for current component.
   * @param {InputAttributesDescriptor} inputPropertiesDescriptor contains properties as input attributes.
   */
  constructor(container, inputPropertiesDescriptor) {
    super(container);
    Object.assign(this, inputPropertiesDescriptor);
    this.render();
    this.currentInput = this.rootContainer.getElementsByTagName('input')[0];
  }

  /**
   * @inheritdoc
   */
  markup() {
    const {inputId, labelText, inputType, inputName, inputPlaceholder} = this;
    return `
            <div class="credential-container">
                <label id="input-label" for="${inputId}">${labelText}</label>

                <div class="input-container">
                    <input type="${inputType}" id="${inputId}" 
                    name="${inputName}" placeholder="${inputPlaceholder}" class="input form-input"/>
                    <div class="error-message"></div>
                </div>
            </div>
`;
  }

  /**
   * Show error message under concrete input.
   *
   * @param {string} message error message.
   */
  showErrorMessage(message) {
    this.rootContainer.querySelector('.error-message').innerText = message;
  }

  /**
   * Erases error message under concrete input.
   */
  cleanErrorMessage() {
    this.rootContainer.querySelector('.error-message').innerText = '';
  }

  /**
   * Used for getting input values.
   *
   * @return {string} user`s credential.
   */
  get inputValue() {
    return this.rootContainer.getElementsByTagName('input')[0].value;
  }
}
