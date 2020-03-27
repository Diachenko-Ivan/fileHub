import {Router} from '../app/router.js';
import {LoginFormComponent} from '../app/component/form-login';

const {module, test} = QUnit;

export default module('Router test', function (hook) {
  let fixture;
  const pageMapping = {
    '/login': () => new LoginFormComponent(fixture)
  };
  const windowMock = {
    location: {
      set hash(url) {
        this._hash = url;
      },
      get hash() {
        return this._hash;
      },
    },
    addEventListener() {
    }
  };

  hook.beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
    this.router = new Router(windowMock, fixture, pageMapping);
  });

  test('should generate existing page', (assert) => {
    this.router.generatePage('/login');
    const errorPage = document.querySelector('[data-test="error-page"]');
    const userForm = document.querySelector('[data-test="login-form"]');

    assert.notOk(fixture.contains(errorPage), 'Should not show error page.');
    assert.ok(fixture.contains(userForm), 'Should show correct existing page.');
  });

  test('should generate error page due to wrong url', (assert) => {
    this.router.generatePage('/wrongUrl');
    const errorPage = document.querySelector('[data-test="error-page"]');

    assert.ok(fixture.contains(errorPage), 'Should show 404 error page.');
  });

  test('should throw error due to setting nonexistent default page', (assert) => {
    assert.throws(() => {
      this.router.defaultUrl = '/wrongUrl';
    }, 'Should throw error due to wrong default url.');
  });

  test('should check default hash setting.', (assert) => {
    const hashUrl = '/login';
    this.router.defaultUrl = hashUrl;
    const expectedUrlHash = windowMock.location.hash;

    assert.strictEqual(expectedUrlHash.slice(1), hashUrl, 'Should set correct hash value.');
  });
});
