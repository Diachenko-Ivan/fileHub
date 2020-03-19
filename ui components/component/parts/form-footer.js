import {Component} from "../parent-component.js";
import {Button} from "./button.js";

export class FormFooter extends Component {

    constructor(container, buttonText, linkText, linkHref) {
        super(container);
        this.formButtonText = buttonText;
        this.linkText = linkText;
        this.linkHref = linkHref;
    }

    markup() {
        return `
                <div class="credential-container">
                    <div class="input-container">
                        <a class="form-link"></a> 
                        <div id="form-button"></div>
                    </div>
                </div>`
    }


    initNestedComponents() {
        const formButtonContainer = this.rootContainer.querySelector('#form-button');
        this.formButton = new Button(formButtonContainer, 'form-button');
    }

    addEventListener() {
        super.addEventListener();
    }

    set formButtonText(value){
        this._buttonText=value;
        this.formButton.buttonText=value;
    }

    set linkText(value) {
        this._linkText = value;
        this.rootContainer.getElementsByTagName('a')[0].innerText = value;
    }

    set linkHref(value) {
        this._linkHref = value;
        this.rootContainer.getElementsByTagName('a')[0].setAttribute('href', value);
    }
}
