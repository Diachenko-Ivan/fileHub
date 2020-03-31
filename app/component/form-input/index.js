import {Component} from "../parent-component.js";

/**
 * Used for user forms as credentials input.
 */
export class FormInput extends Component {
    /**
     * Creates new @type {FormInput} instance.
     * @param container
     * @param inputPropertiesDescriptor {Object} contains properties as input attributes.
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
        return `
            <div class="credential-container">
                <label id="input-label" for="${this.inputId}">${this.labelText}</label>

                <div class="input-container">
                    <input type="${this.inputType}" id="${this.inputId}" 
                    name="${this.inputName}" placeholder="${this.inputPlaceholder}" class="input form-input"/>
                    <div class="error-message"></div>
                </div>
            </div>
`;
    }

    showErrorMessage(message) {
        this.rootContainer.querySelector('.error-message').innerText = message;
    }

    cleanErrorMessage() {
        this.rootContainer.querySelector('.error-message').innerText = '';
    }

    get inputValue() {
        return this.rootContainer.getElementsByTagName('input')[0].value;
    }


}
