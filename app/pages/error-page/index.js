import {Component} from '../../component/parent-component.js';
import {TitleService} from '../../services/title-service';

/**
 * Represents error page for whole application.
 */
export class ErrorPage extends Component {
  /**
   * Creates new {@type ErrorPage} instance.
   *
   * @param {Element} container - outer container for current component.
   */
  constructor(container) {
    super(container);
    this.render();
    TitleService.getInstance().setTitle('404 Page');
  }
  
  /**
   * @inheritdoc
   */
  markup() {
    return `
        <div data-test="error-page" class="application-box">
            <div class="error-code"><h1>404</h1></div>
            <div class="not-found-message"><h4>Sorry, this page was not found.</h4></div>
            <a href="#">Go to main page.</a>
        </div>`;
  }
}
