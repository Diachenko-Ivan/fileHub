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
  _fakeElementTag = 'div';
  
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
    this.rootContainer = this._getRootElement();
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
    const fakeRootElement = this._getRootElement();
    this.rootContainer.innerHTML = fakeRootElement.innerHTML;
    this.rootContainer.classList = fakeRootElement.classList;
    this.initNestedComponents();
    this.addNestedEventListeners();
  }
  
  /**
   * Creates fake element for component render.
   *
   * @return {Element} fake element.
   * @private
   */
  _getRootElement() {
    const fakeElement = document.createElement(this._fakeElementTag);
    
    fakeElement.innerHTML = this.markup();
    return fakeElement.firstElementChild;
  }
  
  /**
   * Returns classes for root element depending on component style properties(isSelected, isLoading etc.).
   *
   * <p>If "classProperties" object`s key is true property in current component then object`s value is its style class.
   *
   * @param {Object<string, string>} classProperties - object where key is component property and value is style class.
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
