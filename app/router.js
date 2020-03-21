import {ErrorPage} from "./pages/error-page";

export class Router {

    constructor(container, pageMapping) {
        this.container = container;
        this._pageMapping = pageMapping;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', event => {
            const nextURL = window.location.hash.slice(1);
            this.generatePage(nextURL);
        })
    }

    set defaultUrl(url) {
        if (!this._pageMapping[url]) {
            throw new Error('This url can not be default. It does not exist.')
        }

        this._defaultUrl = url;
        if (window.location.hash === '') {
            window.location.hash = `#${url}`;
        } else {
            this.generatePage(window.location.hash.slice(1))
        }
    }

    generatePage(url) {
        this.container.innerHTML = '';
        if (!this._pageMapping[url]) {
            new ErrorPage(this.container, 404, 'Sorry, this page was not found.')
        } else {
            this._pageMapping[url]();
        }
    }
}
