import {Component} from "../parent-component.js";

/**
 * Component that represents header for user forms.
 */
export class FormHeader extends Component {
  /**
   *  Creates new {@type FormHeader} instance.
   *
   * @param {Element} container - outer container for form header(user form).
   * @param {string} headerText - text that is placed in header.
   */
  constructor(container, headerText) {
    super(container);
    this._headerText = headerText;
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
        <header class="header form-header">
            <div class="form-target"><h1>${this._headerText}</h1></div>
            <div class="user-icon"><i class="glyphicon glyphicon-user"></i></div>
        </header>
        `;
  }
}
