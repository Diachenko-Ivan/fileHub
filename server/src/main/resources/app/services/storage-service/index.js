/**
 * Service for saving variables in local or session storage.
 */
export class StorageService {
  /**
   * Creates new StorageService.
   *
   * @param {Storage} storage - type of in-browser storage.
   */
  constructor(storage) {
    this._storage = storage;
  }

  /**
   * Sets new item to local or session storage.
   *
   * @param {string} key - variable name.
   * @param {string} value - variable value.
   */
  setItem(key, value) {
    this._storage.setItem(key, value);
  }

  /**
   * Gets existing item value.
   *
   * @param {string} key - item name.
   * @return {string} value from storage.
   */
  getItem(key) {
    return this._storage.getItem(key);
  }

  /**
   * Removes existing item.
   *
   * @param {string} key - item name.
   */
  removeItem(key) {
    this._storage.removeItem(key);
  }
}
