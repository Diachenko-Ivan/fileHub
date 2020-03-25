/**
 * Abstract representation of html component.
 */
export class Component {
  /**
   * Creates new {@type Component} instance.
   *
   * @param {Element} container outer container for current component.
   */
  constructor(container) {
    this.init(container);
  }

  /**
   * Initializes component.
   *
   * @param {Element} container outer container for current component.
   */
  init(container) {
    this.container = container;
  }

  /**
   * Initializes root container with component`s html markup.
   */
  render() {
    const fakeComponent = document.createElement('div');
    fakeComponent.innerHTML = `<div>${this.markup()}</div>`;
    this.rootContainer = fakeComponent.querySelector('div').firstElementChild;
    this.container.append(this.rootContainer);
    this.initNestedComponents();
    this.addEventListener();
  }

  /**
   * Returns html markup for current component.
   */
  markup() {
  }

  /**
   * Initializes inner {@type Element} components for current component if it has them.
   */
  initNestedComponents() {

  }

  /**
   * Adds event handlers for current component.
   */
  addEventListener() {

  }
}
