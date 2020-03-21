import {Component} from "../parent-component.js";

export class CredentialInputComponent extends Component {

    constructor(container, inputId, inputType, inputName, inputPlaceHolder, labelText) {
        super(container);
        this.currentInput = this.rootContainer.getElementsByTagName('input')[0];
        this.currentInputId = inputId;
        this.currentInputType = inputType;
        this.currentInputName = inputName;
        this.currentInputPlaceholder = inputPlaceHolder;
        this.labelText = labelText;
    }

    markup() {
        return `
            <div class="credential-container">
                <label id="input-label"></label>

                <div class="input-container">
                    <input class="input form-input"/>
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

    set labelText(value) {
        this._labelText = value;
        this.rootContainer.querySelector('#input-label').innerText = value;
    }

    get labelText() {
        return this._labelText;
    }

    set currentInputId(value) {
        this._inputId = value;
        this.currentInput.setAttribute('id', value);
        this.rootContainer.querySelector('#input-label').setAttribute('for', value);
    }

    get currentInputId() {
        return this._inputId;
    }

    set currentInputType(value) {
        this._inputId = value;
        this.currentInput.setAttribute('type',value);
    }

    get currentInputType() {
        return this._inputId;
    }

    set currentInputName(value) {
        this._inputId = value;
        this.currentInput.setAttribute('name',value);
    }

    get currentInputName() {
        return this._inputId;
    }

    set currentInputPlaceholder(value) {
        this._inputId = value;
        this.currentInput.setAttribute('placeholder',value);
    }

    get currentInputPlaceHolder() {
        return this._inputId;
    }

    get inputValue() {
        return this.rootContainer.getElementsByTagName('input')[0].value;
    }


}
