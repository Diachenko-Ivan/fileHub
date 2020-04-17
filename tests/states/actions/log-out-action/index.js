import {FileListLoadErrorMutator} from '../../../../app/states/mutator/file-list-load-error-mutator';
import {LogOutAction} from '../../../../app/states/actions/log-out-action';

const {test, module} = QUnit;

export default module('LogOutAction test', function (hook) {
  const action = new LogOutAction();

  test('should call load error mutator.', function (assert) {
    assert.expect(1);
    const error = new Error();
    const mockStateManager = {
      mutate(loadErrorMutator) {
        if (loadErrorMutator instanceof FileListLoadErrorMutator
          && loadErrorMutator.loadError === error) {
          assert.ok(true, 'Should call load error mutator.');
        }
      }
    };
    const mockApiService = {
      logOut() {
        return Promise.reject(error);
      }
    };

    action.apply(mockStateManager, mockApiService);
  });
});
