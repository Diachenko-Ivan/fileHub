import {Component} from "../parent-component.js";

export class FormHeader extends Component{

    markup() {
        return `
        <header class="header form-header">
            <div class="form-target"><h1>${this.headerText}</h1></div>
            <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
        </header>
        `
    }

    get headerText(){
        return this._headerText;
    }
    set headerText(value){
        this._headerText=value;
    }
}