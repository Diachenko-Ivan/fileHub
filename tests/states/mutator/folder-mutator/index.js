import {FolderMutator} from '../../../../app/states/mutator/folder-mutator';

const {test, module} = QUnit;
export default module('FolderMutator', function (hook) {
  let state;
  
  test('should set correct current folder to state.', function (assert) {
    state = {
      currentFolder: {},
    };
    const currentFolder = {name: 'Docs', id: '123', type: 'folder', filesCount: 10};
    const mutator = new FolderMutator(currentFolder);
    
    mutator.apply(state);
    assert.deepEqual(state.currentFolder, currentFolder, 'Should set correct current folder.');
  });
});
