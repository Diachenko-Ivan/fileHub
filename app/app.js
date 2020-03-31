import {Component} from "./component/parent-component.js";
import {LoginFormComponent} from "./component/login-form-component.js";

/**
 * Base component for application that stores different pages.
 */
export class Application extends Component {

    /**
     * @inheritdoc
     */
    constructor(container) {
        super(container);
        this.render();
    }

    /**
     * @inheritdoc
     */
    markup() {
        return `<div id="application"></div>`
    }

    /**
     * @inheritdoc
     */
    initNestedComponents() {
        new LoginFormComponent(this.rootContainer);
    }
}
