import {Component} from '../parent-component.js';
import {Button} from '../button';

/**
 * Component that represents footer for user forms.
 */
export class FormFooter extends Component {
  /**
   * Creates new {@type FormFooter} instance.
   *
   * @param {Element} container - outer container for form footer(user form).
   * @param {string} buttonText - text placed in button.
   * @param {string} linkText - text for link.
   * @param {string} linkHref - hash link to another form.
   */
  constructor(container, buttonText, linkText, linkHref) {
    super(container);
    this._formButtonText = buttonText;
    this._linkText = linkText;
    this._linkHref = linkHref;
    this.render();
  }

    /**
     * @inheritdoc
     */
    markup() {
        return `
                <div class="form-footer-container">
                    <div class="form-footer-button-container">
                        <a class="form-link" href="${this._linkHref}">${this._linkText}</a> 
                    </div>
                </div>`;
  }

    /**
     * @inheritdoc
     */
    initNestedComponents() {
        const formButtonContainer = this.rootContainer.querySelector('.form-footer-button-container');
        this.formButton = new Button(formButtonContainer, 'form-button', this._formButtonText);
    }
}
