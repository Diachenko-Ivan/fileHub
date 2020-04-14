import {Component} from '../parent-component.js';

/**
 * Represents either file or folder.
 */
export class FileItem extends Component {
  /**
   * @inheritdoc
   */
  render() {
    const fakeComponent = document.createElement('tbody');
    fakeComponent.innerHTML = this.markup();
    this.rootContainer = fakeComponent.firstElementChild;
    this.container.append(this.rootContainer);
    this.initNestedComponents();
    this.addEventListener();
  }

  /**
   * Adds handler on remove action.
   *
   * @param {Function} handler - executed when delete action is called.
   */
  onRemove(handler) {
    this.removeHandler = (model) => handler(model);
  }
}
