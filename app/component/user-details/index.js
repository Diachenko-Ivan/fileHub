import {Component} from '../parent-component.js';

/**
 * Represents username.
 */
export class UserDetails extends Component {
  /**
   * Creates new {@type UserDetails} instance.
   *
   * @param {Element} container - outer container.
   * @param {string} username - user`s name.
   */
  constructor(container, username) {
    super(container);
    this._username = username;
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<span><i class="glyphicon glyphicon-user"></i>
            <span data-element="username">${this._username}</span></span>`;
  }

  set username(value) {
    this._username = value;
    this.rootContainer.querySelector('[data-element="username"]').innerText = value;
  }
}
