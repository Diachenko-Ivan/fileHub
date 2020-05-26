import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class CreateFolderErrorMutator extends Mutator {
  /**
   * Creates new {@type CreateFolderErrorMutator} instance.
   *
   * @param {Error} createFolderError - error in the result of creating a new folder.
   */
  constructor(createFolderError) {
    super();
    this.createFolderError = createFolderError;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.createFolderError = this.createFolderError;
  }
}
