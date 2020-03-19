export class Component {
    constructor(container) {
        this.init(container);
    }

    init(container) {
        this.container=container;
        this.render();
        this.initNestedComponents();
        this.addEventListener();
    }

    render() {
        const fakeComponent=document.createElement('div');
        fakeComponent.innerHTML=`<div>${this.markup()}</div>`;
        this.rootContainer = fakeComponent.querySelector('div').firstElementChild;
        this.container.append(this.rootContainer);
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
