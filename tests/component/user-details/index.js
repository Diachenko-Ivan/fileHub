import {UserDetails} from '../../../app/component/user-details';

const {test, module} = QUnit;

export default module('UserDetails test', function (hook) {

  let fixture;

  hook.beforeEach(function () {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should render user details component.', function (assert) {
    const username = 'Username';
    const userDetails = new UserDetails(fixture);

    const userDetailsComponent = fixture.firstElementChild;

    userDetails.username = username;

    assert.ok(userDetailsComponent, 'Should render user details component.');
    assert.strictEqual(userDetailsComponent.innerText, username, 'Should render correct username.');
  });
});
