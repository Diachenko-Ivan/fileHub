/**
 * Abstract representation of html component.
 */
export class Component {
  /**
   * Tag name of fake element.
   *
   * @type {string}
   * @private
   */
  _fakeElement = 'div';
  
  /**
   * Creates new {@type Component} instance.
   *
   * @param {Element} container - outer container for current component.
   */
  constructor(container) {
    this.init(container);
  }
  
  /**
   * Initializes component.
   *
   * @param {Element} container - outer container for current component.
   */
  init(container) {
    this.container = container;
  }
  
  /**
   * Initializes root container with component`s html markup.
   */
  render() {
    const fakeComponent = document.createElement(this._fakeElement);
    fakeComponent.innerHTML = this.markup();
    this.rootContainer = fakeComponent.firstElementChild;
    this.container.append(this.rootContainer);
    this.initNestedComponents();
    this.addRootContainerEventListeners();
    this.addNestedEventListeners();
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
   * Adds event handlers for nested elements of current component.
   */
  addNestedEventListeners() {
  
  }
  
  /**
   * Adds event listeners for root element.
   */
  addRootContainerEventListeners() {
  
  }
  
  /**
   * Re-renders current component.
   */
  rerender() {
    this.rootContainer.innerHTML = '';
    const fakeElement = document.createElement(this._fakeElement);
    
    fakeElement.innerHTML = this.markup();
    const fakeRootElement = fakeElement.firstElementChild;
    this.rootContainer.innerHTML = fakeRootElement.innerHTML;
    this.rootContainer.classList = fakeRootElement.classList;
    this.initNestedComponents();
    this.addNestedEventListeners();
  }
  
  /**
   * Returns classes for root element.
   *
   * @param {object} classProperties
   * @return {string} row with style classes.
   */
  getRootElementClasses(classProperties) {
    let classes = '';
    Object.keys(classProperties).forEach((key) => {
      if (this[key]) {
        classes = `${classes} ${classProperties[key]}`;
      }
    });
    return classes;
  }
  
  /**
   * Executes before component is destroyed.
   */
  destroy() {
  
  }
}
