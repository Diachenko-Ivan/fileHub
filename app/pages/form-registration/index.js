import {Component} from "../../component/parent-component.js";
import {CredentialInputComponent} from "../../component/form-input";
import {FormHeader} from '../../component/form-header'
import {FormFooter} from "../../component/form-footer";

export class RegistrationFormComponent extends Component {

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
        this.header = new FormHeader(this.rootContainer, 'Registration');

        this.loginInput = new CredentialInputComponent(this.rootContainer,
            'email', 'text', 'email', 'Email', "Username");

        this.passwordInput = new CredentialInputComponent(this.rootContainer,
            'password', 'password', 'password', 'Password', 'Password');

        this.repeatPasswordInput = new CredentialInputComponent(this.rootContainer,
            'password', 'password', 'password', 'Confirm password', 'Confirm Password');

        this.footer = new FormFooter(this.rootContainer, 'Register', 'Already have an account?', '#/login');
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
