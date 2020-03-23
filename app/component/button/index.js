import {Component} from "../parent-component.js";

/**
 * Plays role of simple button.
 */
export class Button extends Component {
    /**
     * Event handler for button.
     * @type {Function[]}
     */
    handlers=[];

    /**
     * Creates new {@type Button} instance.
     * @param container outer container for button.
     * @param className {string} value for class attribute.
     * @param buttonText {string} value for inner button text.
     */
    constructor(container, className, buttonText) {
        super(container);
        this.className = className;
        this.buttonText = buttonText;
    }

    /**
     * @inheritDoc
     */
    markup() {
        return `
        <button></button>`;
    }

    /**
     * Add custom handler for button 'onclick' event.
     * @param handler {Function} function that is going to be executed on event.
     */
    onClick(handler){
        this.handlers.push(handler);
    }

    /**
     *@inheritDoc
     */
    addEventListener() {
        this.rootContainer.addEventListener('click', ()=>this.handlers.forEach(handler=>handler()));
    }

    set className(value) {
        this._className = value;
        this.rootContainer.setAttribute('class',`button ${value}`);
    }

    get className() {
        return this._className;
    }

    set buttonText(value) {
        this._buttonText = value;
        this.rootContainer.innerText = value;
    }

    get buttonText() {
        return this._buttonText;
    }
}
