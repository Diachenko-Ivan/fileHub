import {RemoveItemAction} from '../../../../app/states/actions/remove-item-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {GetFolderAction} from '../../../../app/states/actions/file-list-action';

const {test, module} = QUnit;

export default module('RemoveItemAction test', function (hook) {
  
  test('should dispatch GetFolderAction after successful deletion.', function (assert) {
    const action = new RemoveItemAction({type: 'folder'});
    assert.expect(3);
    const done = assert.async();
    const folderId = 'root';
    const stateManager = {
      state: {
        currentFolder: {
          id: folderId,
        },
      },
      dispatch(action) {
        return new Promise((resolve, reject) => {
          if (action instanceof GetFolderAction) {
            assert.step(`GetFolderAction ${action.folderId}`);
            resolve();
          }
          reject(new Error());
        });
      },
    };
    const mockApiService = {
      removeFolder() {
        assert.step('RemoveFolder');
        return Promise.resolve();
      },
    };
    
    action.apply(stateManager, mockApiService)
      .then(() => {
        assert.verifySteps(['RemoveFolder', `GetFolderAction ${folderId}`],
          'Should dispatch GetFolderAction after success folder deletion');
        done();
      });
  });
  test('should call load error mutator after unsuccessful deletion.', function (assert) {
    const action = new RemoveItemAction({type: 'file'});
    assert.expect(3);
    const done = assert.async();
    const loadError = new Error('error');
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError}`);
        }
      },
    };
    const apiService = {
      removeFile() {
        assert.step('RemoveFile');
        return Promise.reject(loadError);
      },
    };
    
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps(['RemoveFile', `FileListLoadErrorMutator ${loadError}`],
          'Should call FileListLoadErrorMutator after file deletion attempt.');
        done();
      });
  });
});
