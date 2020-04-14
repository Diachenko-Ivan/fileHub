import {RemoveItemAction} from '../../../../app/states/actions/remove-item-action';

const {test, module} = QUnit;

export default module('RemoveItemAction test', function (hook) {
  const mockStateManager = {
    dispatch() {
    },
  };

  test('should set loadError to state.', function (assert) {
    const action = new RemoveItemAction({type: 'folder'});
    const error = new Error();
    const mockApiService = {
      removeFolder() {
        return Promise.reject(error);
      }
    };
    const done = assert.async();

    action.apply(mockStateManager, mockApiService)
      .then((result) => {
        assert.deepEqual(result, error, 'Should return error.');
        done();
      });
  });
});
