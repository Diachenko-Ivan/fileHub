import {Component} from '../../parent-component.js';

/**
 * Represents icon which makes actions with file item.
 */
export class FileItemIcon extends Component {
  /**
   * Array of icon click handlers.
   * @type {Function[]}
   */
  _handlers = [];

  /**
   * @typedef IconDescription
   * @property {string} styleClass - type of icon.
   */
  /**
   * Creates new {@type FileItemIcon} component.
   *
   * @param {Element} container - outer container.
   * @param {IconDescription} iconDescription - descriptor of icon type.
   */
  constructor(container, iconDescription) {
    super(container);
    Object.assign(this, iconDescription);
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `<i class="glyphicon glyphicon-${this.styleClass}"></i>`;
  }

  /**
   * @inheritdoc
   */
  addEventListener() {
    this.rootContainer.addEventListener('click', () => this._handlers.forEach((handler) => handler()));
  }

  /**
   * Register new click handler for icon.
   *
   * @param {Function} callback - function that is invoked when icon is clicked.
   */
  onClick(callback) {
    this._handlers.push(callback);
  }
}
