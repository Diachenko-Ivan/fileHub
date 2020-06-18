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
    return `<span class="user-details ${this.getRootElementClasses({_isLoading: 'is-loading'})}">
            <i class="glyphicon glyphicon-user"></i>
            <span class="username" data-element="username"></span></span>`;
  }

  /**
   * Sets new user name value.
   *
   * @param {string} value - user name.
   */
  set username(value) {
    this.rootContainer.querySelector('[data-element="username"]').innerText = value;
  }

  /**
   * Defines either user detail is loading or not
   *
   * @param {boolean} value - loading or not.
   */
  set isLoading(value) {
    this._isLoading = value;
    this.rerender();
  }
}
