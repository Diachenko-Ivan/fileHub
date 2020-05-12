import {Component} from '../parent-component.js';

/**
 * Represents username.
 */
export class UserDetails extends Component {
  /**
   * Creates new {@type UserDetails} instance.
   *
   * @param {Element} container - outer container.
   */
  constructor(container) {
    super(container);
    this.render();
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `<span><i class="glyphicon glyphicon-user"></i>
            <span data-element="username"></span></span>`;
  }
  
  /**
   * Sets new user name value.
   *
   * @param {string} value - user name.
   */
  set username(value) {
    this._username = value;
    this.rootContainer.querySelector('[data-element="username"]').innerText = value;
  }
}
