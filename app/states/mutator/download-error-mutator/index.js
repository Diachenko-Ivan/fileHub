import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class DownloadErrorMutator extends Mutator {
  /**
   * Creates new {@type DownloadErrorMutator} instance.
   *
   * @param {DownloadErrorObject} errorObject - download error.
   */
  constructor(errorObject) {
    super();
    this.downloadErrorObject = errorObject;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.downloadErrorObject = this.downloadErrorObject;
  }
}
