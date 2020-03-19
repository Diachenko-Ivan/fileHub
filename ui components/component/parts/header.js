import {Component} from "../parent-component.js";

export class FormHeader extends Component{

    constructor(container, headerText) {
        super(container);
        this.headerText=headerText;
    }


    markup() {
        return `
        <header class="header form-header">
            <div class="form-target"><h1></h1></div>
            <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
        </header>
        `
    }

    set headerText(value){
        this._headerText=value;
        this.rootContainer.firstElementChild.innerText=value;
    }
}
