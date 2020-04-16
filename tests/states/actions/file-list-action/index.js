import {GetFileListAction} from '../../../../app/states/actions/file-list-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {FileListMutator} from '../../../../app/states/mutator/file-list-mutator';
import {FileListLoadingMutator} from '../../../../app/states/mutator/file-list-loading-mutator';

const {test, module} = QUnit;

export default module('GetFileListAction test', function (hook) {
  const action = new GetFileListAction();
  const list = [{name: 'file'}];

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const mockStateManager = {
      mutate(errorMutator) {
        if (errorMutator instanceof FileListLoadErrorMutator) {
          assert.ok(true, 'Should call load error mutator');
        }
      },
    };
    const mockApiService = {
      getFileItemList() {
        return Promise.reject(new Error());
      }
    };

    action.apply(mockStateManager, mockApiService);
  });

  test('should call FileListMutator.', function (assert) {
    assert.expect(1);
    const mockStateManager = {
      mutate(listMutator) {
        if (listMutator instanceof FileListMutator
          && list === listMutator.fileList) {
          assert.ok(true);
        }
      },
    };
    const mockApiService = {
      getFileItemList() {
        return Promise.resolve({fileList: list});
      }
    };

    action.apply(mockStateManager, mockApiService);
  });

  test('should call FileLoadingMutator.', function (assert) {
    assert.expect(2);
    const mockStateManager = {
      mutate(loadingMutator) {
        if (loadingMutator instanceof FileListLoadingMutator
          && loadingMutator.isLoading === true) {
          assert.ok(true, 'Should call FileLoadingMutator with isLoading true.');
        }else if (loadingMutator instanceof FileListLoadingMutator
          && loadingMutator.isLoading === false) {
          assert.ok(true, 'Should call FileLoadingMutator with isLoading false.');
        }
      },
    };
    const mockApiService = {
      getFileItemList() {
        return Promise.resolve({fileList: list});
      }
    };

    action.apply(mockStateManager, mockApiService);
  });
});
