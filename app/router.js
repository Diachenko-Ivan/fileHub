export class Router {

    constructor(container, pageMapping) {
        this.container=container;
        this._pageMapping = pageMapping;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', event => {
            const nextURL = window.location.hash.slice(1);
            console.log(nextURL);
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
        }
    }

    generatePage(url) {
        if (!this._pageMapping[url]) {

        } else {
            this.container.innerHTML = '';
            this._pageMapping[url]();
        }
    }
}
