import {RemovingItemsMutator} from '../../../../app/states/mutator/remove-items-mutator';

const {test, module} = QUnit;
export default module('RemovingItemsMutator', function () {
  let state;
  
  test('should add item id to removingItemsIds if it does not exist there.', function (assert) {
    state = {
      removingItemsIds: ['423', 'sdf', 'jhd'],
    };
    const removingItemId = 'asd';
    const expectedRemovingIds = ['423', 'sdf', 'jhd', 'asd'];
    const mutator = new RemovingItemsMutator(removingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRemovingIds, state.removingItemsIds, 'Should contain correct array of ids.');
  });
  
  test('should remove item id from removingItemsIds if it already exists there.', function (assert) {
    state = {
      removingItemsIds: ['423', 'sdf', 'jhd'],
    };
    const removingItemId = 'sdf';
    const expectedRemovingIds = ['423', 'jhd'];
    const mutator = new RemovingItemsMutator(removingItemId);
    
    mutator.apply(state);
    assert.deepEqual(expectedRemovingIds, state.removingItemsIds, 'Should contain correct array of ids.');
  });
});
