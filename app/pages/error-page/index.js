import {Component} from "../../component/parent-component.js";

/**
 * Represents error page for whole application.
 */
export class ErrorPage extends Component {

    /**
     * Creates new {@type ErrorPage} instance.
     * @param container {Element} outer container for current component.
     * @param errorCode error page error code.
     * @param errorMessage error page error message.
     */
    constructor(container, errorCode, errorMessage) {
        super(container);
        this._errorCode = errorCode;
        this._errorMessage = errorMessage;
        this.render();
    }

    /**
     * @inheritDoc
     */
    markup() {
        return `
        <div id="error-page" class="application-box">
            <div id="error-code"><h1>${this._errorCode}</h1></div>
            <div style="color: #cc0005" id="error-message"><h4>${this._errorMessage}</h4></div>
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
