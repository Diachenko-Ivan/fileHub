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
            'repeatPassword', 'password', 'password', 'Confirm password', 'Confirm Password');

        this.footer = new FormFooter(this.rootContainer, 'Register', 'Already have an account?', '#/login');
    }


    addEventListener() {
        this.footer.formButton.onClick(() => {
            const loginValue = this.loginInput.inputValue;
            const passwordValue = this.passwordInput.inputValue;
            const repeatPasswordValue = this.repeatPasswordInput.inputValue;

            if (this.validateInputValues(loginValue, passwordValue) &&
                this.confirmPasswordsEqual(passwordValue, repeatPasswordValue)) {

                alert('Registered');
            }

        });

        this.rootContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });

    }

    confirmPasswordsEqual(passwordValue, repeatPasswordValue) {
        if (passwordValue !== repeatPasswordValue) {
            this.repeatPasswordInput.showErrorMessage('Passwords are not equal.');
            return false;
        }
        return true;
    }

    validateInputValues(loginValue, passwordValue) {
        this.loginInput.cleanErrorMessage();
        this.passwordInput.cleanErrorMessage();
        this.repeatPasswordInput.cleanErrorMessage();

        const loginRegexp = new RegExp(`^([a-zA-Z0-9]){4,}$`);
        const passwordRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$');

        if (!(loginRegexp.test(loginValue) && passwordRegexp.test(passwordValue))) {
            if (!loginRegexp.test(loginValue)) {
                this.loginInput.showErrorMessage('Login can\'t be empty and should have uppercase' +
                    ' or lowercase letters and digits, min length 4.');
            }
            if (!passwordRegexp.test(passwordValue)) {
                this.passwordInput.showErrorMessage('Password can\'t be empty and should have at least one uppercase' +
                    ' and lowercase letter and digit, min length 8.');
            }
            return false;
        }
        return true;
    }
}
