import {Component} from "../../component/parent-component.js";

export class ErrorPage extends Component {

    constructor(container, errorCode, errorMessage) {
        super(container);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    markup() {
        return `
        <div id="error-page" class="application-box">
            <div id="error-code"><h1></h1></div>
            <div style="color: #cc0005" id="error-message"><h4></h4></div>
        </div>`;
    }


    set errorCode(value) {
        this._errorCode = value;
        this.rootContainer.querySelector('#error-code').firstElementChild.innerText=value;
    }

    set errorMessage(value) {
        this._errorMessage = value;
        this.rootContainer.querySelector('#error-message').firstElementChild.innerText=value;
    }
}
