import {RemoveItemAction} from '../../../../app/states/actions/remove-item-action';
import {RemoveItemErrorMutator} from '../../../../app/states/mutator/remove-item-error-mutator';
import {RemovingItemsMutator} from '../../../../app/states/mutator/remove-items-mutator';
import {RemovedItemsMutator} from '../../../../app/states/mutator/remove-finished-item-mutator';
import {AuthenticationError} from '../../../../app/models/errors/authentication-error';

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
        removingItemIds: [],
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof RemovedItemsMutator) {
          assert.step(`RemovedItemsMutator ${mutator.removedItemId}`);
        } else if (mutator instanceof RemovingItemsMutator) {
          assert.step(`RemovingItemsMutator ${mutator.removingItemId}`);
        } else {
          assert.step(mutator.constructor.name);
        }
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
            'RemovedItemsMutator id',
            'GetFolderContentAction root',
          ],
          'Should call mutators and dispatch action in the correct order.');
        done();
      });
  });
  
  test('should call mutators in the correct order and do not call GetFolderContentAction  after successful deletion.', function (assert) {
    const removingId = 'id';
    const action = new RemoveItemAction({type: 'folder', id: removingId});
    assert.expect(3);
    const done = assert.async();
    const folderId = 'root';
    const stateManager = {
      state: {
        removingItemIds: [],
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        assert.step(`${action.constructor.name} ${action.folderId}`);
        return Promise.resolve();
      },
      mutate(mutator) {
        if (mutator instanceof RemovedItemsMutator) {
          assert.step(`RemovedItemsMutator ${mutator.removedItemId}`);
          this.state.currentFolder.id = '123';
        } else if (mutator instanceof RemovingItemsMutator) {
          assert.step(`RemovingItemsMutator ${mutator.removingItemId}`);
        } else {
          assert.step(mutator.constructor.name);
        }
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
            'RemovedItemsMutator id',
          ],
          'Should call mutators in the correct order.');
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
        removingItemIds: [],
        currentFolder: {
          id: 'root',
        },
      },
      mutate(mutator) {
        if (mutator instanceof RemoveItemErrorMutator) {
          assert.step(`RemoveItemErrorMutator ${mutator.removeError.message}`);
        } else if (mutator instanceof RemovingItemsMutator) {
          assert.step(`RemovingItemsMutator ${mutator.removingItemId}`);
        } else if (mutator instanceof RemovedItemsMutator) {
          assert.step(`RemovedItemsMutator ${mutator.removedItemId}`);
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
            `RemoveItemErrorMutator ${removeError.message}`,
            'RemovedItemsMutator id',
            'GetFolderContentAction root'],
          'Should call mutators and dispatch action in the correct order.');
        done();
      });
  });
  
  test('should call mutators in the correct order and do not call GetFolderContentAction after unsuccessful deletion.', function (assert) {
    const removingId = 'id';
    const name = 'docs';
    const action = new RemoveItemAction({type: 'file', id: removingId, name});
    assert.expect(4);
    const done = assert.async();
    const removeError = new AuthenticationError('error');
    const stateManager = {
      state: {
        removingItemIds: [],
        currentFolder: {
          id: 'root',
        },
      },
      mutate(mutator) {
        if (mutator instanceof RemoveItemErrorMutator) {
          assert.step(`RemoveItemErrorMutator ${mutator.removeError.message}`);
        } else if (mutator instanceof RemovingItemsMutator) {
          assert.step(`RemovingItemsMutator ${mutator.removingItemId}`);
        } else if (mutator instanceof RemovedItemsMutator) {
          assert.step(`RemovedItemsMutator ${mutator.removedItemId}`);
          this.state.currentFolder.id = '123';
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
            `RemoveItemErrorMutator ${removeError.message}`,
            'RemovedItemsMutator id'],
          'Should call mutators  in the correct order.');
        done();
      });
  });
});
