import {Component} from "./component/parent-component.js";
import {LoginFormComponent} from "./component/login-form-component.js";

/**
 * Base component for application that stores different pages.
 */
export class Application extends Component {


    /**
     * @inheritDoc
     */
    markup() {
        return `<div id="application"></div>`
    }

    /**
     * @inheritDoc
     */
    initNestedComponents() {
        new LoginFormComponent(this.rootContainer);
    }
}
