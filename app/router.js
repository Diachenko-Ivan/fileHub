import {ErrorPage} from './pages/error-page';

/**
 * Router for full application that controls page changing.
 */
export class Router {
  /**
   * Creates new {@type Router} instance.
   *
   * @param {Element} container - container where pages are generated in.
   * @param {object} pageMapping - set of page mappings with appropriate pages.
   */
  constructor(container, pageMapping) {
    this.container = container;
    this._pageMapping = pageMapping;
    this.init();
  }

  /**
   * Sets event handler for hash changing.
   */
  init() {
    window.addEventListener('hashchange', (event) => {
      const nextURL = window.location.hash.slice(1);
      this.generatePage(nextURL);
    });
  }

  /**
   * Sets default page for first application start.
   *
   * @param {string} url - page url for first application load.
   */
  set defaultUrl(url) {
    if (!this._pageMapping[url]) {
      throw new Error('This url can not be default. It does not exist.');
    }

    this._defaultUrl = url;
    if (window.location.hash === '') {
      window.location.hash = `#${url}`;
    } else {
      this.generatePage(window.location.hash.slice(1));
    }
  }

  /**
   * Generates new page on hash change.
   *
   * @param {string} url - hash for concrete page.
   */
  generatePage(url) {
    this.container.innerHTML = '';
    if (!this._pageMapping[url]) {
      new ErrorPage(this.container, 404, 'Sorry, this page was not found.');
    } else {
      this._pageMapping[url]();
    }
  }
}
