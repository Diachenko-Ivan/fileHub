import {Component} from "./component/parent-component.js";
import {LoginFormComponent} from "./pages/from-login";
import {Router} from "./router.js";
import {RegistrationFormComponent} from "./pages/form-registration";

export class Application extends Component {

    markup() {
        return `<div id="application"></div>`
    }

    initNestedComponents() {
        const pageMapping = {
            '/login': () => new LoginFormComponent(this.rootContainer),
            '/registration': () => new RegistrationFormComponent(this.rootContainer),
        };

        this.router = new Router(this.rootContainer, pageMapping);
        this.router.defaultUrl = '/login';
    }
}
