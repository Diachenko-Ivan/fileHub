import {NewFolderSourceMutator} from '../../../../app/states/mutator/new-folder-source-mutator';

const {test, module} = QUnit;

export default module('NewFolderSourceMutator', function (hook) {
  let state;
  
  test('should set correct new folder source to state.', function (assert) {
    state = {
      newFolderSource: {},
    };
    const folder = {name: 'qwe', type: 'folder', filesCount: 10};
    const mutator = new NewFolderSourceMutator(folder);
    
    mutator.apply(state);
    assert.deepEqual(state.newFolderSource, folder, 'Should set correct new folder source.');
  });
});
