import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UploadErrorMutator extends Mutator {
  /**
   * Creates new {@type UploadErrorMutator} instance.
   *
   * @param {{model: FolderModel, error: Error}} uploadErrorObject - error in the result of upload.
   */
  constructor(uploadErrorObject) {
    super();
    this.uploadErrorObject = uploadErrorObject;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.uploadErrorObject = this.uploadErrorObject;
  }
}
