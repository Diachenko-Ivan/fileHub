import {UploadFileAction} from '../../../../app/states/actions/upload-file-action';

const {test, module} = QUnit;

export default module('UploadFileAction test', function (hook) {
  const action = new UploadFileAction('id', new File([JSON.stringify({})], 'file'));

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const stateManager = {
      mutate() {
        assert.ok(true, 'Should call stateManager.mutate().');
      }
    };
    const apiService = {
      uploadFile() {
        return Promise.reject();
      }
    };

    action.apply(stateManager, apiService);
  });
});
