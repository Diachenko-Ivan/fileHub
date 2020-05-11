import {Component} from '../parent-component.js';

/**
 * Represents username.
 */
export class UserDetails extends Component {
  /**
   * @typedef UserDetailsDescription
   * @property {string} username - user`s name.
   */
  /**
   * Creates new {@type UserDetails} instance.
   *
   * @param {Element} container - outer container.
   * @param {UserDetailsDescription} userDetailsDescription - user`s info.
   */
  constructor(container, userDetailsDescription) {
    super(container);
    Object.assign(this, userDetailsDescription);
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
  setNewUsername(value) {
    this.username = value;
    this.rootContainer.querySelector('[data-element="username"]').innerText = value;
  }
}
