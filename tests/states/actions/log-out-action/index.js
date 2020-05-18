import {LogOutAction} from '../../../../app/states/actions/log-out-action';

const {test, module} = QUnit;

export default module('LogOutAction', function (hook) {
  test('should call logout method from api service.', function (assert) {
    const action = new LogOutAction();
    assert.expect(2);
    const done = assert.async();
    const mockStateManager = {};
    const mockApiService = {
      logOut() {
        assert.step('Logout');
        return Promise.resolve();
      },
    };
    
    action.apply(mockStateManager, mockApiService)
      .then(() => {
        assert.verifySteps([`Logout`], 'Should call logout method from api service.');
        done();
      });
  });
});
