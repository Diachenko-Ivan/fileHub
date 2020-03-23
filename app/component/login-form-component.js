import {Component} from "./parent-component.js";
import {FormInput} from "./form-input";
import {FormHeader} from './form-header'
import {FormFooter} from "./form-footer";

export class LoginFormComponent extends Component {

    constructor(...containers) {
        super(...containers);
    }

    markup() {
        return `
        <form class="application-box user-form">
            <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
        </form>  
`;
    }

    initNestedComponents() {
        this.header = new FormHeader(this.rootContainer, 'Login');

        this.loginInput = new FormInput(this.rootContainer,
            'email', 'text', 'email', 'Email', "Username");

        this.passwordInput = new FormInput(this.rootContainer,
            'password', 'password', 'password', 'Password', 'Password');

        this.footer = new FormFooter(this.rootContainer, 'Log In', 'Don\'t have an account yet?', '#');
    }


    addEventListener() {
        this.footer.formButton.onClick(() => {
            this.loginInput.cleanErrorMessage();
            this.passwordInput.cleanErrorMessage();

            const emailValue = this.loginInput.inputValue;
            const passwordValue = this.passwordInput.inputValue;
            if (!emailValue || !passwordValue) {
                if (!emailValue) {
                    this.loginInput.showErrorMessage('Username can\'t be empty');
                }
                if (!passwordValue) {
                    this.passwordInput.showErrorMessage('Password can\'t be empty and should contain letters and numbers');
                }
            } else
                alert(`Successfully authenticated\nEmail:${emailValue}`);
        });

        this.rootContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });

    }
}
