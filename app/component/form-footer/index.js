import {Component} from "../parent-component.js";
import {Button} from "../button";

export class FormFooter extends Component {

    constructor(container, buttonText, linkText, linkHref) {
        super(container);
        this.formButtonText = buttonText;
        this.linkText = linkText;
        this.linkHref = linkHref;
    }

    markup() {
        return `
                <div class="form-footer-container">
                    <div class="form-footer-button-container">
                        <a class="form-link"></a> 
                    </div>
                </div>`
    }


    initNestedComponents() {
        const formButtonContainer = this.rootContainer.querySelector('.form-footer-button-container');
        this.formButton = new Button(formButtonContainer, 'form-button');
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
