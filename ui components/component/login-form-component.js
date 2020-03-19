import {Component} from "./parent-component.js";
import {CredentialInputComponent} from "./parts/credential-input.js";
import {FormHeader} from './parts/header.js'

export class LoginFormComponent extends Component {

    constructor(...containers) {
        super(...containers);
    }

    markup() {
        return `
        <div class="application-box user-form">
            <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
            <div id="form-header"></div>
            <div>
                <div id="email-input"></div>
                <div id="password-input"></div>
                <div class="credential-container">
                    <div class="input-container">
                    <a class="form-link" href="registration.html">Don't have an account yet?</a>
                <button class="button form-button">Log In</button></div></div>
            </div>   
        </div>  
`;
    }

    initNestedComponents() {
        const headerContainer = this.rootContainer.querySelector('#form-header');
        const loginInputContainer = this.rootContainer.querySelector('#email-input');
        const passwordInputContainer = this.rootContainer.querySelector('#password-input');

        this.header = new FormHeader(headerContainer, 'Login');

        this.loginInput = new CredentialInputComponent(loginInputContainer,
            'email', 'text', 'email', 'Email', "Username");

        this.passwordInput = new CredentialInputComponent(passwordInputContainer,
            'password', 'password', 'password', 'Password', 'Password');
    }


    addEventListener() {
        document.querySelector('.form-button').addEventListener('click', () => {
            this.loginInput.cleanErrorMessage();
            this.passwordInput.cleanErrorMessage();

            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;
            if (!emailValue || !passwordValue) {
                if (!emailValue) {
                    this.loginInput.showErrorMessage('Username can\'t be empty');
                }
                if (!passwordValue) {
                    this.passwordInput.showErrorMessage('Password can\'t be empty and should contain letters and numbers');
                }
            } else
                alert('Successfully authorized');

        })

    }
}
