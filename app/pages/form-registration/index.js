import {Component} from "../../component/parent-component.js";
import {FormInput} from "../../component/form-input";
import {FormHeader} from '../../component/form-header'
import {FormFooter} from "../../component/form-footer";

/**
 * User registration form.
 */
export class RegistrationFormComponent extends Component {

    constructor(...containers) {
        super(...containers);
        this.render()
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

        this.loginInput = new FormInput(this.rootContainer, {
            inputId: 'login',
            inputType: 'text',
            inputName: 'login',
            inputPlaceholder: 'Login',
            labelText: 'Username'
        });

        this.passwordInput = new FormInput(this.rootContainer, {
            inputId: 'password',
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'Password',
            labelText: 'Password'
        });

        this.repeatPasswordInput = new FormInput(this.rootContainer, {
            inputId: 'repeatPassword',
            inputType: 'password',
            inputName: 'password',
            inputPlaceholder: 'Confirm password',
            labelText: 'Confirm Password'
        });

        this.footer = new FormFooter(this.rootContainer, 'Register', 'Already have an account?', '#/login');
    }


    addEventListener() {
        this.footer.formButton.onClick(() => {
            this.loginInput.cleanErrorMessage();
            this.passwordInput.cleanErrorMessage();
            this.repeatPasswordInput.cleanErrorMessage();

            const loginValue = this.loginInput.inputValue;
            const passwordValue = this.passwordInput.inputValue;
            const repeatPasswordValue = this.repeatPasswordInput.inputValue;

            Promise.allSettled([this.validateLogin(loginValue), this.validatePassword(passwordValue)])
                .then(([loginValidation
                           , passwordValidation]) => {
                    if (loginValidation.status === "rejected" || passwordValidation.status === 'rejected') {
                        if (loginValidation.status === "rejected") {
                            this.loginInput.showErrorMessage(loginValidation.reason);
                        }
                        if (passwordValidation.status === 'rejected') {
                            this.passwordInput.showErrorMessage(passwordValidation.reason);
                        }
                    } else {
                        if (this.confirmPasswordsEqual(passwordValue, repeatPasswordValue)) {
                            alert('Registered');
                        }
                    }

                })
        });

        this.rootContainer.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });

    }

    validateLogin(login) {
        return new Promise((resolve, reject) => {
            const loginRegexp = new RegExp(`^([a-zA-Z0-9]){4,}$`);
            if (!login) {
                reject('Username can\'t be empty.');
            }
            if (login.length < 4) {
                reject('Minimal length 4 chars.');
            }
            if (!loginRegexp.test(login)) {
                reject('Login should have uppercase' +
                    ' or lowercase letters and digits.')
            }
            resolve('Login validated');
        })
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            const passwordRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$');
            if (!password) {
                reject('Password can\'t be empty.');
            }
            if (password.length < 8) {
                reject('Minimal length 8 chars.');
            }
            if (!passwordRegexp.test(password)) {
                reject('Password should have at least one uppercase' +
                    ' and lowercase letter and digit.')
            }
            resolve('Password validated');
        })
    }

    confirmPasswordsEqual(passwordValue, repeatPasswordValue) {
        if (passwordValue !== repeatPasswordValue) {
            this.repeatPasswordInput.showErrorMessage('Passwords are not equal.');
            return false;
        }
        return true;
    }

}


