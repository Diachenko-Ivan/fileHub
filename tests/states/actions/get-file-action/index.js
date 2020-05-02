import {GetFileAction} from '../../../../app/states/actions/get-file-action';
import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';

const {test, module} = QUnit;

export default module('GetFileAction', function (hook) {
  const action = new GetFileAction('id');
  
  test('should call load error mutator after unsuccessful download.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const loadError = new Error('error');
    const apiService = {
      downloadFile() {
        return Promise.reject(loadError);
      },
    };
    const stateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError}`);
        }
      },
    };
    action.apply(stateManager, apiService)
      .then(() => {
        assert.verifySteps([`FileListLoadErrorMutator ${loadError}`], 'Should mutate load error mutator ');
        done();
      });
  });
});
