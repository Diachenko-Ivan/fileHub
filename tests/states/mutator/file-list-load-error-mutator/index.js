import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';

const {test, module} = QUnit;

export default module('FileListLoadErrorMutator test', function (hook) {
  let state = {};

  test('should set correct load error to state.', function (assert) {
    const message = 'Unable to load file list.';
    const loadError = new Error(message);
    const mutator = new FileListLoadErrorMutator(loadError);

    mutator.apply(state);
    assert.strictEqual(state.loadError.message, message, 'Should return the same error message.');
  });
});
