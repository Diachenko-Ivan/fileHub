import {Component} from '../parent-component.js';

/**
 * Abstract component of highest order that can have a state.
 */
export class StateAwareComponent extends Component {
  /**
   * Creates new instance.
   *
   * @param container
   * @param {StateManager} stateManager -
   */
  constructor(container, stateManager) {
    super(container);
    this.stateManager = stateManager;
    this.initState();
  }

  /**
   * Dispatches action from component.
   *
   * @param {Action} action - action that is going to be executed.
   * @return {Promise}
   */
  dispatch(action) {
    return this.stateManager.dispatch(action);
  }

  initState() {
  }

  /**
   * Registers handler for concrete property.
   *
   * @param {string} property - name of state property.
   * @param {Function} handler - function that is invoked when property is changed.
   */
  onStateChange(property, handler) {
    this.stateManager.onStateChanged(property, handler);
  }
}
