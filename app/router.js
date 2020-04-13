import {NOT_FOUND_PAGE_URL} from './config/router-config';

/**
 * Router for full application that controls page changing.
 */
export class Router {
  /**
   * Instance of current page.
   * @type {Component}
   */
  _currentPage;
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
      const urlTemplate = this._getUrlTemplate(nextURL);
      if (urlTemplate) {
        const dynamicHashParams = this._hashDynamicPart(nextURL, urlTemplate);
        if (urlTemplate !== this._currentPageUrl) {
          this._generatePage(urlTemplate);
          this._dynamicPartHandler(nextURL, dynamicHashParams);
        } else {
          this._dynamicPartHandler(nextURL, dynamicHashParams);
        }
      } else {
        this._generatePage(nextURL);
      }
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
      this._generatePageOnLoad(this._window.location.hash.slice(1));
    }
  }

  /**
   * Returns url template from concrete hash if it has dynamic parameters.
   *
   * @param {string} hash - url hash value.
   * @return {string|null} url template from hash.
   * @private
   */
  _getUrlTemplate(hash) {
    const urlTemplate = Object.keys(this._pageMapping).find((mapping) => {
      const staticPart = mapping.split('/:')[0];
      return hash.startsWith(staticPart) && mapping.includes(':');
    });

    if (urlTemplate && urlTemplate.split('/').length === hash.split('/').length) {
      return urlTemplate;
    }
    return null;
  }

  /**
   * Gets dynamic part of hash.
   *
   * @param hash - hash for concrete page.
   * @param {string} urlTemplate - url template with dynamic parameters.
   * @return {{}} object whose properties are dynamic parts of url and their values.
   * @private
   */
  _hashDynamicPart(hash, urlTemplate) {
    const splittedTemplate = urlTemplate.split('/');

    const keyToMap = splittedTemplate.reduce((accumulator, key, index) => {
      if (!key.startsWith(':')) {
        return accumulator;
      }
      accumulator[key.slice(1)] = index;
      return accumulator;
    }, {});

    const splittedHash = hash.split('/');

    return Object.entries(keyToMap).reduce((accumulator, [key, index]) => {
      accumulator[key] = splittedHash[index];
      return accumulator;
    }, {});
  };

  /**
   * Registers
   * @param handler
   */
  onDynamicPartChange(handler) {
    this._dynamicPartHandler = (staticPart, params) => handler(staticPart, params);
  };

  /**
   * Generates new page on hash change.
   *
   * @param {string} url - hash for concrete page.
   */
  _generatePage(url) {
    this.container.innerHTML = '';
    if (!url) {
      this._window.location.hash = `#${this._defaultUrl}`;
      this._currentPageUrl = this._defaultUrl;
      return;
    }
    if (this._currentPage) {
      this._currentPage.destroy();
    }
    if (!this._pageMapping[url]) {
      this._pageMapping[NOT_FOUND_PAGE_URL]();
      this._currentPageUrl = '';
    } else {
      this._pageMapping[url]();
      this._currentPageUrl = url;
    }
  }

  /**
   * Generates page when application is loaded.
   *
   * @param {string} hash - hash for concrete page.
   * @private
   */
  _generatePageOnLoad(hash) {
    const urlTemplate = this._getUrlTemplate(hash);
    if (urlTemplate) {
      const dynamicParam = this._hashDynamicPart(hash, urlTemplate);
      this._generatePage(urlTemplate);
      this._dynamicPartHandler(hash, dynamicParam);
    } else {
      this._generatePage(hash);
    }
  }
}
