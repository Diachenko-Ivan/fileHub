import {GetFileListAction} from '../../../../app/states/actions/file-list-action';

const {test, module} = QUnit;

export default module('GetFileListAction test', function (hook) {
  const action = new GetFileListAction();
  const mockStateManager = {
    mutate() {
    },
  };

  test('should set loadError to state.', function (assert) {
    const mockApiService = {
      getFileItemList() {
        return Promise.reject(new Error());
      }
    };
    const done = assert.async();

    action.apply(mockStateManager, mockApiService)
      .then((result) => {
        assert.notOk(result, 'Should not return undefined.');
        done();
      });
  });

  test('should set fileList to state.', function (assert) {
    const mockApiService = {
      getFileItemList() {
        return Promise.resolve({fileList: [{}]});
      }
    };
    const done = assert.async();

    action.apply(mockStateManager, mockApiService)
      .then((result) => {
        assert.ok(result, 'Should return file list.');
        done();
      });
  });

});
