import {Component} from '../parent-component.js';

/**
 * Used for user forms as credentials input.
 */
export class FormInput extends Component {
  /**
   * @typedef {object} InputAttributesDescriptor
   * @property {string} inputId - id for input.
   * @property {string} inputType - type for input
   * @property {string} inputName - name for input
   * @property {string} inputPlaceholder - placeholder for input
   * @property {string} labelText - text for input label.
   */
  /**
   * Creates new @type {FormInput} instance.
   *
   * @param {Element} container - outer container for current component.
   * @param {InputAttributesDescriptor} inputPropertiesDescriptor - contains properties as input attributes.
   */
  constructor(container, inputPropertiesDescriptor) {
    super(container);
    Object.assign(this, inputPropertiesDescriptor);
    this.render();
    this._errorMessage = this.rootContainer.querySelector('[data-test="error-message"]');
  }

  /**
   * @inheritdoc
   */
  markup() {
    const {inputId, labelText, inputType, inputName, inputPlaceholder} = this;
    return `
            <div class="row">
                <label for="${inputId}">${labelText}</label>
                <div class="input-container">
                    <input class="input" id="${inputId}" type="${inputType}" placeholder="${inputPlaceholder}" name="${inputName}"/>
                    <span data-test="error-message" class="error-message"></span>
                </div>
            </div>
       
`;
  }

  /**
   * Show error message under concrete input.
   *
   * @param {string} message - error message.
   */
  showErrorMessage(message) {
    this._errorMessage.innerText = message;
  }

  /**
   * Erases error message under concrete input.
   */
  cleanErrorMessage() {
    this._errorMessage.innerText = '';
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
