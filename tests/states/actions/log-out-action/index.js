import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {LogOutAction} from '../../../../app/states/actions/log-out-action';

const {test, module} = QUnit;

export default module('LogOutAction', function (hook) {
  const action = new LogOutAction();
  
  test('should call load error mutator after unsuccessful log out.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const loadError = new Error('error');
    const mockStateManager = {
      mutate(mutator) {
        if (mutator instanceof FileListLoadErrorMutator) {
          assert.step(`FileListLoadErrorMutator ${mutator.loadError}`);
        }
      },
    };
    const mockApiService = {
      logOut() {
        return Promise.reject(loadError);
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([`FileListLoadErrorMutator ${loadError}`], 'Should call load error mutator ');
        done();
      });
  });
});
