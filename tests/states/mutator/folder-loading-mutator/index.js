import {FolderLoadingMutator} from '../../../../app/states/mutator/folder-loading-mutator';

const {test, module} = QUnit;

export default module('FolderLoadingMutator', function () {
  let state;
  
  test('should set loading.', function (assert) {
    state = {};
    const mutator = new FolderLoadingMutator(true);
    mutator.apply(state);
    assert.ok(state.isFolderLoading, 'Should be loading.');
  });
  test('should cancel loading.', function (assert) {
    state = {
      isFolderLoading: true,
    };
    const mutator = new FolderLoadingMutator(false);
    mutator.apply(state);
    assert.notOk(state.isFolderLoading, 'Should not be loading.');
  });
});
