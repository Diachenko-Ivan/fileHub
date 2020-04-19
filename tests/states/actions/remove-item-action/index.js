import {RemoveItemAction} from '../../../../app/states/actions/remove-item-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';

const {test, module} = QUnit;

export default module('RemoveItemAction test', function (hook) {

  test('should set loadError to state.', function (assert) {
    const action = new RemoveItemAction({type: 'folder'});
    const error = new Error();
    const stateManager = {
      mutate(mutator) {
        assert.ok(mutator instanceof FileListLoadErrorMutator, 'Should call load error mutator.');
      }
    };
    const mockApiService = {
      removeFolder() {
        return Promise.reject(error);
      }
    };

    action.apply(stateManager, mockApiService);
  });
});
