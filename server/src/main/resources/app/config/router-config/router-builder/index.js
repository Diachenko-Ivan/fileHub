import {Router} from '../../../router.js';

/**
 * Used for configuring and creation of new {@link Router} instance.
 */
export class RouterBuilder {
  /**
   * Sets base application container to router.
   *
   * @param {Element} container - main application container
   * @return {RouterBuilder} current instance.
   */
  appContainer(container) {
    this._container = container;
    return this;
  }

  /**
   * Sets window object.
   *
   * @param {WindowOrWorkerGlobalScope} window - main window.
   * @return {RouterBuilder} current instance.
   */
  window(window) {
    this._window = window;
    return this;
  }

  /**
   * Sets page mappings to router.
   *
   * @param {object} mapping - set of page mappings with appropriate pages.
   * @return {RouterBuilder} current instance.
   */
  pageMapping(mapping) {
    this._pageMapping = mapping;
    return this;
  }

  /**
   * Sets default url value for router.
   *
   * @param {string} value - url.
   * @return {RouterBuilder} current instance.
   */
  defaultUrl(value) {
    this.defaultUrl = value;
    return this;
  }

  /**
   * Sets handler for returning of dynamic hash parts.
   *
   * @param {Function} handler - callback that is used for returning of dynamic hash part.
   * @return {RouterBuilder} current instance.
   */
  onDynamicHashChange(handler) {
    this._dynamicPartHandler = (staticPart, params) => handler(staticPart, params);
    return this;
  }

  /**
   * Creates new router instance.
   *
   * @return {Router} new instance
   */
  build() {
    return new Router(this);
  }
}
