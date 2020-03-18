import {Component} from "./parent-component.js";
import {CredentialInputComponent} from "./parts/credential-input.js";
import {FormHeader} from './parts/header.js'

export class LoginFormComponent extends Component {

    constructor(...containers) {
        super(...containers);
    }

    markup() {
        return `
        <img alt="TeamDev" class="logo" src="../src/main/resources/teamdev.png"> 
        <div id="form-header"></div>
        <div>
            <div class="credential-container"></div>
            <div class="credential-container"></div>
            <div class="credential-container">
                <div class="input-container">
                <a class="form-link" href="registration.html">Don't have an account yet?</a>
            <button class="button form-button">Log In</button></div></div>
        </div>     
`
    }

    initNestedComponents() {
        const loginInputContainer = this.rootContainer.querySelector('.credential-container:first-child');
        const passwordInputContainer = this.rootContainer.querySelector('.credential-container:nth-child(2)');
        const headerContainer=this.rootContainer.querySelector('#form-header');

        this.header=new FormHeader(headerContainer);
        this.header.headerText='Login';
        this.header.render();

        this.loginInput = new CredentialInputComponent(loginInputContainer);
        this.loginInput.labelText = 'Username';
        this.loginInput.defineProperties('email', 'text', 'email', 'Email')
        this.loginInput.render();

        this.passwordInput = new CredentialInputComponent(passwordInputContainer);
        this.passwordInput.labelText = 'Password';
        this.passwordInput.defineProperties('password', 'password', 'password', 'Password')
        this.passwordInput.render();
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
