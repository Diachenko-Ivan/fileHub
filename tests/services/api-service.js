import {ApiService} from '../../app/services/api-service.js';
import {UserCredentials} from '../../app/models/user-credentials';

const {test, module} = QUnit;

export default module('ApiService test', function (hook) {
  const service = new ApiService();

  test('should (or not) return server errors in login.', function (assert) {
    const done = assert.async();
    assert.expect(1);
    service.login(new UserCredentials('login', 'password'))
        .then(() => assert.ok(true, 'Should not return server error.'))
        .catch((error) => {
          assert.notOk(true, 'Should return server error.');
          assert.ok(error, 'Should contain error.');
        });
    done();
  });

  test('should (or not) return server errors in registration.', function (assert) {
    const done = assert.async();
    assert.expect(1);
    service.register(new UserCredentials('login', 'password'))
        .then(() => assert.ok(true, 'Should not return server error.'))
        .catch((error) => {
          assert.notOk(true, 'Should return server error.');
          assert.ok(error, 'Should contain error.');
        });
    done();
  });
});
