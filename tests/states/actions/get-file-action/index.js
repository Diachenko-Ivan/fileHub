import {GetFileAction} from '../../../../app/states/actions/get-file-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';

const {test, module} = QUnit;

export default module('GetFileAction test', function (hook) {
  const action = new GetFileAction('id');

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const apiService = {
      downloadFile() {
        return Promise.reject(new Error());
      },
    };
    const stateManager = {
      mutate(mutator) {
        assert.ok(mutator instanceof FileListLoadErrorMutator, 'Should call load error mutator.');
      },
    };
    action.apply(stateManager, apiService);
  });
});