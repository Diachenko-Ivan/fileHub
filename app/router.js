/**
 * Router for full application that controls page changing.
 */
export class Router {
  /**
   * @typedef PageMapping
   * @property {string} url - page url.
   * @property {Function} page - function that returns page.
   */
  /**
   * Creates new {@type Router} instance.
   *
   * @param {Window} window - current window.
   * @param {Element} container - container where pages are generated in.
   * @param {PageMapping} pageMapping - set of page mappings with appropriate pages.
   */
  constructor(window, container, pageMapping) {
    this._window = window;
    this.container = container;
    this._pageMapping = pageMapping;
    this.init();
  }

  /**
   * Sets event handler for hash changing.
   */
  init() {
    this._window.addEventListener('hashchange', (event) => {
      const nextURL = this._window.location.hash.slice(1);
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
    if (!this._window.location.hash) {
      this._window.location.hash = `#${url}`;
    } else {
      this.generatePage(this._window.location.hash.slice(1));
    }
  }

  /**
   * Generates new page on hash change.
   *
   * @param {string} url - hash for concrete page.
   */
  generatePage(url) {
    this.container.innerHTML = '';
    if (!url) {
      this._pageMapping[this._defaultUrl]();
      return;
    }
    if (!this._pageMapping[url]) {
      this._pageMapping['/404']();
    } else {
      this._pageMapping[url]();
    }
  }
}
