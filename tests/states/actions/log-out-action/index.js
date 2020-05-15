import {LogOutAction} from '../../../../app/states/actions/log-out-action';

const {test, module} = QUnit;

export default module('LogOutAction', function (hook) {
  const action = new LogOutAction();
  
  test('should call load error mutator after unsuccessful log out.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const error = new Error('error');
    const mockStateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.logoutError.message}`);
      },
    };
    const mockApiService = {
      logOut() {
        return Promise.reject(error);
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([`LogoutErrorMutator ${error.message}`], 'Should call load error mutator ');
        done();
      });
  });
  
  
  test('should call load error mutator after unsuccessful log out.', function (assert) {
    assert.expect(2);
    const done = assert.async();
    const mockStateManager = {
      mutate(mutator) {
        assert.step(`${mutator.constructor.name} ${mutator.isLoggedOut}`);
      },
    };
    const mockApiService = {
      logOut() {
        return Promise.resolve();
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([`LogoutMutator true`], 'Should call load error mutator ');
        done();
      });
  });
});
