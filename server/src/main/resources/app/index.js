import {Application} from './app.js';
// import {MockServer} from './services/mock-server.js';

/**
 * Main container for application.
 *
 * @type {Element}
 */
const formContainer = document.querySelector('#app');
// new MockServer();
new Application(formContainer);
