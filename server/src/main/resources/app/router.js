import {NOT_FOUND_PAGE_URL} from './config/router-config/index.js';
import {RouterBuilder} from './config/router-config/router-builder/index.js';

/**
 * Router for full application that controls page changing.
 */
export class Router {
  /**
   * Instance of current page.
   *
   * @type {Component}
   */
  _currentPage;

  /**
   * Creates new {@type Router} instance.
   *
   * @param {RouterBuilder} routerBuilder - builder for router instance.
   */
  constructor(routerBuilder) {
    Object.assign(this, routerBuilder);
    this.init();
  }

  /**
   * Sets event handler for hash changing.
   */
  init() {
    this._window.addEventListener('hashchange', () => {
      this._handleHashChange();
    });
    this._handleHashChange();
  }

  /**
   * Used for handling hashchange event.
   *
   * @private
   */
  _handleHashChange() {
    const nextURL = this._getHashValue();
    if (!nextURL) {
      this._window.location.hash = `#${this.defaultUrl}`;
      return;
    }
    const urlTemplate = this._getUrlTemplate(nextURL);
    if (urlTemplate !== this._currentPageUrl) {
      if (this._currentPage) {
        this._currentPage.destroy();
      }
      this._renderPage(urlTemplate);
    }
    const dynamicHashParams = this._getHashDynamicPart(nextURL, urlTemplate);
    if (dynamicHashParams) {
      this._dynamicPartHandler(nextURL, dynamicHashParams);
    }
  }

  /**
   * Sets default page for first application start.
   *
   * @param {string} url - page url for first application load.
   */
  set defaultUrl(url) {
    if (!this._getUrlTemplate(url)) {
      throw new Error('This url can not be default. It does not exist.');
    }
    this._defaultUrl = url;
  }

  /**
   * Returns url template from concrete hash.
   *
   * @param {string} hash - url hash value.
   * @return {string|null} url template from hash.
   * @private
   */
  _getUrlTemplate(hash) {
    const urlTemplate = Object.keys(this._pageMapping).find((mapping) => {
      const staticPart = mapping.split('/:')[0];
      const splitStaticPart = staticPart.split('/');
      const splitHash = hash.split('/').slice(0, splitStaticPart.length);
      return JSON.stringify(splitHash) === JSON.stringify(splitStaticPart);
    });
    if (urlTemplate && urlTemplate.split('/').length === hash.split('/').length) {
      return urlTemplate;
    }
    return NOT_FOUND_PAGE_URL;
  }

  /**
   * Gets dynamic part of hash.
   *
   * @param {string} hash - hash for concrete page.
   * @param {string} urlTemplate - url template with dynamic parameters.
   * @return {{}} object whose properties are dynamic parts of url and their values.
   * @private
   */
  _getHashDynamicPart(hash, urlTemplate) {
    const templateParts = urlTemplate.split('/');
    const keyToMap = templateParts.reduce((accumulator, key, index) => {
      if (!key.startsWith(':')) {
        return accumulator;
      }
      accumulator[key.slice(1)] = index;
      return accumulator;
    }, {});

    if (!Object.keys(keyToMap).length) {
      return null;
    }
    const hashParts = hash.split('/');

    return Object.entries(keyToMap).reduce((accumulator, [key, index]) => {
      accumulator[key] = hashParts[index];
      return accumulator;
    }, {});
  }

  /**
   * Generates new page on hash change.
   *
   * @param {string} url - hash for concrete page.
   */
  _renderPage(url) {
    this._container.innerHTML = '';
    this._currentPage = this._pageMapping[url](this);
    this._currentPageUrl = url;
  }

  /**
   * Changes hash value.
   *
   * @param {string} hashUrl - new url hash.
   */
  redirectTo(hashUrl) {
    this._window.location.hash = hashUrl;
  }

  /**
   * Returns current window hash value.
   *
   * @return {string} hash value.
   * @private
   */
  _getHashValue() {
    return this._window.location.hash.slice(1);
  }

  /**
   * Returns router default url.
   *
   * @return {string} default url for router.
   */
  get defaultUrl() {
    return this._defaultUrl;
  }

  /**
   * Renders 404 error page.
   * <p>May be used by components with dynamic hash params.
   */
  renderNotFoundPage() {
    this._renderPage(NOT_FOUND_PAGE_URL);
  }

  /**
   * Creates new {@link RouterBuilder} instance.
   *
   * @return {RouterBuilder} instance.
   */
  static builder() {
    return new RouterBuilder();
  }
}
