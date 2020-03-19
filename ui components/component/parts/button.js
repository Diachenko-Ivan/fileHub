import {Component} from "../parent-component.js";

export class Button extends Component {

    handlers=[];
    
    constructor(container, className, buttonText) {
        super(container);
        this.className = className;
        this.buttonText = buttonText;
    }

    markup() {
        return `
        <button></button>`;
    }

    onClick(handler){
        this.handlers.push(handler);
    }

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
