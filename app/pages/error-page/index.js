import {Component} from '../../component/parent-component.js';

/**
 * Represents error page for whole application.
 */
export class ErrorPage extends Component {
  /**
   * Creates new {@type ErrorPage} instance.
   *
   * @param {Element} container - outer container for current component.
   * @param {number} errorCode - error page`s error code.
   * @param {string} errorMessage - error page`s error message.
   */
  constructor(container, errorCode, errorMessage) {
    super(container);
    this._errorCode = errorCode;
    this._errorMessage = errorMessage;
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
        <div data-test="error-page" class="application-box">
            <div id="error-code"><h1>${this._errorCode}</h1></div>
            <div style="color: #cc0005" id="error-message"><h4>${this._errorMessage}</h4></div>
        </div>`;
  }
}
