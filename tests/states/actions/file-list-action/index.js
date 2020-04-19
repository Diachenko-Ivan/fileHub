import {GetFolderAction} from '../../../../app/states/actions/file-list-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';
import {FolderMutator} from '../../../../app/states/mutator/folder-mutator';

const {test, module} = QUnit;

export default module('GetFolderAction test', function (hook) {
  const action = new GetFolderAction('qw');

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const error = new Error();
    const mockStateManager = {
      mutate(loadErrorMutator) {
        if (loadErrorMutator instanceof FileListLoadErrorMutator) {
          assert.ok(true, 'Should call load error mutator.');
        }
      }
    };
    const mockApiService = {
      getFolder() {
        return Promise.reject(error);
      }
    };

    action.apply(mockStateManager, mockApiService);
  });

  test('should call folder mutator.', function (assert) {
    assert.expect(2);
    const folder = {name: 'doc'};
    const content = [{}];
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FolderMutator && folder === mutator.currentFolder) {
          assert.ok(true, 'Should call FolderMutator.');
        }
        if (mutator instanceof FileListMutator && mutator.fileList === content) {
          assert.ok(true, 'Should call FileListMutator.');
        }
      }
    };
    const mockApiService = {
      getFolder() {
        return Promise.resolve(folder);
      },
      getFolderContent() {
        return Promise.resolve(content);
      }
    };

    action.apply(mockStateManager, mockApiService);
  });
});
