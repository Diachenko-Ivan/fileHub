import {RenamedItemsMutator} from '../../../../app/states/mutator/rename-finished-mutator';

const {test, module} = QUnit;
export default module('RenamedItemsMutator', function () {
  let state;
  
  test('should remove item id to renamingFolderIds.', function (assert) {
    state = {
      renamingFolderIds: new Set(['423', 'sdf', 'jhd']),
    };
    const renamingItemId = 'sdf';
    const expectedRenamingIds = new Set(['423', 'jhd']);
    const mutator = new RenamedItemsMutator(renamingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRenamingIds, state.renamingFolderIds, 'Should contain correct array of ids.');
  });
});
