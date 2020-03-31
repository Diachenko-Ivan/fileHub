import {Component} from "../parent-component.js";

export class FormHeader extends Component{

    constructor(container, headerText) {
        super(container);
        this._headerText=headerText;
        this.render();
    }

    /**
     * @inheritdoc
     */
    markup() {
        return `
        <header class="header form-header">
            <div class="form-target"><h1>${this._headerText}</h1></div>
            <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
        </header>
        `
    }

    set headerText(value){
        this._headerText=value;
        this.rootContainer.querySelector('.form-target').firstElementChild.innerText=value;
    }
}
