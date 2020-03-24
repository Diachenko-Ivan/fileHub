import {Component} from "../parent-component.js";
import {Button} from "../button";

export class FormFooter extends Component {

    constructor(container, buttonText, linkText, linkHref) {
        super(container);
        this._formButtonText = buttonText;
        this._linkText = linkText;
        this._linkHref = linkHref;
        this.render();
    }

    markup() {
        return `
                <div class="form-footer-container">
                    <div class="form-footer-button-container">
                        <a class="form-link" href="${this._linkHref}">${this._linkText}</a> 
                    </div>
                </div>`
    }


    initNestedComponents() {
        const formButtonContainer = this.rootContainer.querySelector('.form-footer-button-container');
        this.formButton = new Button(formButtonContainer, 'form-button', this._formButtonText);
    }
}
