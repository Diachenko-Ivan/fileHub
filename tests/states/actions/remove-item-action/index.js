import {RemoveItemAction} from '../../../../app/states/actions/remove-item-action';
import {RemoveItemErrorMutator} from '../../../../app/states/mutator/remove-item-error-mutator';
import {RemovingItemsMutator} from '../../../../app/states/mutator/remove-items-mutator';

const {test, module} = QUnit;

export default module('RemoveItemAction test', function () {
  
  test('should call mutators and actions after successful deletion.', function (assert) {
    const removingId = 'id';
    const action = new RemoveItemAction({type: 'folder', id: removingId});
    assert.expect(4);
    const done = assert.async();
    const folderId = 'root';
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.removingItemId}`);
      },
    };
    const mockApiService = {
      removeFolder() {
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, mockApiService)
      .then(() => {
        assert.verifySteps([
            'RemovingItemsMutator id',
            'GetFolderContentAction root',
            'RemovingItemsMutator id',
          ],
          'Should call mutators and dispatch action in the correct order.');
        done();
      });
  });
  test('should call remove error mutator after unsuccessful deletion.', function (assert) {
    const removingId = 'id';
    const name = 'docs';
    const action = new RemoveItemAction({type: 'file', id: removingId, name});
    assert.expect(5);
    const done = assert.async();
    const removeError = new Error('error');
    const stateManager = {
      state: {
        currentFolder: {
          id: 'root',
        },
      },
      mutate(mutator) {
        if (mutator instanceof RemoveItemErrorMutator) {
          assert.step(`RemoveItemErrorMutator ${mutator.removeError.message} ${mutator.removingModel.name}`);
        } else if (mutator instanceof RemovingItemsMutator) {
          assert.step(`RemovingItemsMutator ${mutator.removingItemId}`);
        } else {
          assert.step(mutator.constructor.name);
        }
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
    };
    const apiService = {
      removeFile() {
        return Promise.reject(removeError);
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([
            'RemovingItemsMutator id',
            `RemoveItemErrorMutator ${removeError.message} ${name}`,
            'GetFolderContentAction root',
            'RemovingItemsMutator id'],
          'Should call mutators and dispatch action in the correct order.');
        done();
      });
  });
});
