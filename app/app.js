import {Component} from "./component/parent-component.js";
import {LoginFormComponent} from "./component/login-form-component.js";
import {Router} from "./router.js";

export class Application extends Component {

    markup() {
        return `<div id="application"></div>`
    }

    initNestedComponents() {
        const pageMapping = {
            '/login': () => new LoginFormComponent(this.rootContainer),
        };

        debugger
        this.router = new Router(this.rootContainer, pageMapping);
        this.router.defaultUrl = '/login';
    }
}
