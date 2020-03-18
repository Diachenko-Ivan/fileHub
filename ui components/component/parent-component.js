export class Component {
    constructor(container) {
        this.init(container);
    }

    init(container) {
        this.rootContainer = document.createElement('div');
        container.append(this.rootContainer);
    }

    render() {
        this.rootContainer.innerHTML = this.markup();
        this.initNestedComponents();
        this.addEventListener();
    }

    markup() {
    }

    initNestedComponents() {
    }

    defineProperties() {
    }

    addEventListener() {

    }
}