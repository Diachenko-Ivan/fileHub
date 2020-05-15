import {RemovedItemsMutator} from '../../../../app/states/mutator/remove-finished-item-mutator';

const {test, module} = QUnit;
export default module('RemovedItemsMutator', function () {
  
  test('should remove item id from removingItemsIds.', function (assert) {
    const state = {
      removingItemIds: ['423', 'sdf', 'jhd'],
    };
    const removingItemId = 'sdf';
    const expectedRemovingIds = ['423', 'jhd'];
    const mutator = new RemovedItemsMutator(removingItemId);

    mutator.apply(state);
    assert.deepEqual(expectedRemovingIds, state.removingItemIds, 'Should contain correct array of ids.');
  });
});
