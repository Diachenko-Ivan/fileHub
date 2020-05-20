import {FileListLoadingMutator} from '../../../../app/states/mutator/file-list-loading-mutator';

const {test, module} = QUnit;

export default module('FileListLoadingMutator test', function () {
  let state;
  
  test('should set loading.', function (assert) {
    state = {};
    const mutator = new FileListLoadingMutator(true);
    mutator.apply(state);
    assert.ok(state.isLoading, 'Should be loading.');
  });
  test('should cancel loading.', function (assert) {
    state = {
      isLoading: true,
    };
    const mutator = new FileListLoadingMutator(false);
    mutator.apply(state);
    assert.notOk(state.isLoading, 'Should not be loading.');
  });
});
