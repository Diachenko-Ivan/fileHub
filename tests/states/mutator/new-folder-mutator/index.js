import {NewFolderMutator} from '../../../../app/states/mutator/new-folder-mutator';

const {test, module} = QUnit;

export default module('NewFolderMutator', function () {
  let state;
  
  test('should set correct new folder id to state.', function (assert) {
    state = {
      newFolderId: {},
    };
    const folderId = 'qwewer';
    const mutator = new NewFolderMutator(folderId);
    
    mutator.apply(state);
    assert.deepEqual(state.newFolderId, folderId, 'Should set correct new folder.');
  });
});
