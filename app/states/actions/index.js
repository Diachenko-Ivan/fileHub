/**
 * Abstract representation of action that is executed by component.
 */
export class Action {
  /**
   * Executes current action.
   *
   * @param {StateManager} stateManager - application common state manager.
   * @param {ApiService} apiService - service for sending requests to server.
   * @async
   */
  async apply(stateManager, apiService) {

  }
}
