import {FolderLoadErrorMutator} from '../../../../app/states/mutator/folder-load-error-mutator';

const {test, module} = QUnit;

export default module('FolderLoadErrorMutator', function (hook) {
  let state = {};
  
  test('should set correct load error to state.', function (assert) {
    const message = 'Unable to find this folder.';
    const loadError = new Error(message);
    const mutator = new FolderLoadErrorMutator(loadError);
    
    mutator.apply(state);
    assert.strictEqual(state.folderLoadError.message, loadError.message, 'Should return the same error message.');
  });
});
