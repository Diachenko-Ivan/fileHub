/**
 * Handles access to state from
 */
export class StateManager extends EventTarget {
  constructor(initialState) {
    super();
  }

  /**
   * Registers function that is invoked when 'stateChange' event happened.
   *
   * @param {Function} handler - function that is invoked when 'stateChange' event happened.
   */
  onStateChanged(handler) {
    this.addEventListener('stateChange', handler);
  }

  /**
   * Dispatches new action.
   *
   * @param {Action} action
   * @return {Promise} result
   */
  dispatch(action) {
    return action.apply(this);
  }

  /**
   * Calls mutator that mutates current state.
   *
   * @param {Mutator} mutator
   */
  mutate(mutator) {
    mutator.apply(this.state);
  }
}
