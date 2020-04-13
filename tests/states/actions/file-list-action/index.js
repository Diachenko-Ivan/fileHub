import {GetFolderAction} from '../../../../app/states/actions/file-list-action';

const {test, module} = QUnit;

export default module('GetFileListAction test', function (hook) {
  const action = new GetFolderAction();
  const mockStateManager = {
    mutate() {
    },
  };

  test('should set loadError to state.', function (assert) {
    const error = new Error();
    const mockApiService = {
      getFolder() {
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

  test('should set fileList to state.', function (assert) {
    const mockApiService = {
      getFolder() {
        return Promise.resolve({});
      },
      getFolderContent() {
        return Promise.resolve({content: [{}]});
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
