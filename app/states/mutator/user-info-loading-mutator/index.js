import {Mutator} from '../';

/**
 * @inheritdoc
 */
export class UserInfoLoadingMutator extends Mutator {
  /**
   * Creates new {@type FolderLoadingMutator} instance.
   *
   * @param {Boolean} isUserLoading - flag that defines folder loading.
   */
  constructor(isUserLoading) {
    super();
    this.isUserLoading = isUserLoading;
  }
  
  /**
   * @inheritdoc
   */
  apply(state) {
    state.isUserLoading = this.isUserLoading;
  }
}
