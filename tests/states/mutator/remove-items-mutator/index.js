import {RemovingItemsMutator} from '../../../../app/states/mutator/remove-items-mutator';

const {test, module} = QUnit;
export default module('RemovingItemsMutator', function () {
  let state;
  
  test('should add item id to removingItemsIds.', function (assert) {
    state = {
      removingItemIds: ['423', 'sdf', 'jhd'],
    };
    const removingItemId = 'asd';
    const expectedRemovingIds = ['423', 'sdf', 'jhd', 'asd'];
    const mutator = new RemovingItemsMutator(removingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRemovingIds, state.removingItemIds, 'Should contain correct array of ids.');
  });
});
