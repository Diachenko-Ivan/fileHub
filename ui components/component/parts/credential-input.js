import {Component} from "../parent-component.js";

export class CredentialInputComponent extends Component {

    constructor(...containers) {
        super(...containers);
    }

    markup() {
        return `
            <div class="credential-container">
                <label for="${this.currentInputId}">${this.labelText}</label>

                <div class="input-container">
                    <input class="input form-input" id="${this.currentInputId}" type="${this.currentInputType}"
                    placeholder="${this.currentInputPlaceholder}" name="${this.currentInputName}"/>
                    <div class="error-message"></div>
                </div>
            </div>
`;
    }

    defineProperties(inputId, inputType, inputName, inputPlaceholder) {
        this.currentInputId=inputId;
        this.currentInputType = inputType;
        this.currentInputName = inputName;
        this.currentInputPlaceholder = inputPlaceholder;
    }

    showErrorMessage(message){
        this.rootContainer.querySelector('.error-message').innerText=message;
    }

    cleanErrorMessage(){
        this.rootContainer.querySelector('.error-message').innerText='';
    }

    initNestedComponents() {
        super.initNestedComponents();
    }

    set labelText(value) {
        this._labelValue = value;
    }

    get labelText() {
        return this._labelValue;
    }

}
