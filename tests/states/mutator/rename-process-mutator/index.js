import {RenamingItemsMutator} from '../../../../app/states/mutator/rename-process-mutator';

const {test, module} = QUnit;
export default module('RenamingItemsMutator', function () {
  let state;
  
  test('should add item to renamingFolderIds.', function (assert) {
    state = {
      renamingItemIds: new Set(['423', 'sdf', 'jhd']),
    };
    const renamingItemId = 'asd';
    const expectedRenamingIds = new Set(['423', 'sdf', 'jhd', 'asd']);
    const mutator = new RenamingItemsMutator(renamingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRenamingIds, state.renamingItemIds, 'Should contain correct array of ids.');
  });
  
  test('should not add item to renamingFolderIds because it already exists.', function (assert) {
    state = {
      renamingItemIds: new Set(['423', 'sdf', 'jhd']),
    };
    const renamingItemId = 'sdf';
    const expectedRenamingIds = new Set(['423', 'sdf', 'jhd']);
    const mutator = new RenamingItemsMutator(renamingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRenamingIds, state.uploadingFolderIds, 'Should contain correct array of ids.');
  });
});
