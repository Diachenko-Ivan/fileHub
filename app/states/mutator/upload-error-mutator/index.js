import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UploadErrorMutator extends Mutator {
  /**
   * Creates new {@type UploadErrorMutator} instance.
   *
   * @param {Error} uploadError - error in the result of upload.
   */
  constructor(uploadError) {
    super();
    this.uploadError = uploadError
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.uploadError = this.uploadError;
  }
}
