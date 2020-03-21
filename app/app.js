import {Component} from "./component/parent-component.js";
import {LoginFormComponent} from "./component/login-form-component.js";

export class Application extends Component {

    markup() {
        return `<div id="application"></div>`
    }

    initNestedComponents() {
        new LoginFormComponent(this.rootContainer);
    }
}
