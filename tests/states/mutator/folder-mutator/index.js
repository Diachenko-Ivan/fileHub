import {FolderMutator} from '../../../../app/states/mutator/folder-mutator';

const {test, module} = QUnit;
export default module('FolderMutator', function (hook) {
  let state;
  
  test('should set correct current folder to state.', function (assert) {
    state = {
      currentFolder: {},
    };
    const currentFolder = {id: '123', name: 'Docs', type: 'folder', parentId: '123', filesCount: 10};
    const mutator = new FolderMutator(currentFolder);
    
    mutator.apply(state);
    assert.deepEqual(JSON.stringify(state.currentFolder), JSON.stringify(currentFolder), 'Should set correct current folder.');
  });
});
