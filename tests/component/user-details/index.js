import {UserDetails} from '../../../app/component/user-details';

const {test, module} = QUnit;

export default module('UserDetails test', function (hook) {

  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render user details component.', function (assert) {
    const username = 'Username';
    new UserDetails(fixture, username);

    const userDetails = fixture.firstElementChild;

    assert.ok(userDetails, 'Should render user details component.');
    assert.strictEqual(userDetails.innerText, username, 'Should render correct username.');
  });
});
