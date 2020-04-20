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
   * Registers function that is called on the first click on file item.
   *
   * @param {Function} handler - called when click event is raised.
   */
  onFirstClick(handler) {
    this._onFirstClick = () => handler();
  }

  /**
   * Register function that is called when name is changed.
   *
   * @param {Function} handler - called when name is changed.
   */
  onNameChange(handler){
    this._onNameChange = (model) => handler(model);
  }

  /**
   * Executed when user clicked the second time on file item.
   */
  onSecondClick(){

  }

  /**
   * Defines either row is selected or not.
   *
   * @param {boolean} value - selected or not.
   */
  set isSelected(value) {
    this._isSelected = value;
    this.rootContainer.classList.toggle('isSelected', value);
  }

  /**
   * Either selected or not.
   *
   * @return {boolean} - selected or not.
   */
  get isSelected() {
    return this._isSelected;
  }

  /**
   * Defines either row in editing mode or not.
   *
   * @param {boolean} value - selected or not.
   */
  set isEditing(value){
    this._isEditing = value;
  }

  /**
   * @return {boolean} - editing mode or not.
   */
  get isEditing(){
    return this._isEditing;
  }
}
