import {Router} from '../app/router.js';
import {LoginFormComponent} from '../app/component/form-login';
import {ErrorPage} from '../app/pages/error-page';

const {module, test} = QUnit;

export default module('Router test', function (hook) {
  let fixture;
  const pageMapping = {
    '/login': () => new LoginFormComponent(fixture),
    '/404': () => new ErrorPage(fixture, 404, 'Error')
  };
  let windowMock;

  hook.beforeEach(() => {
    windowMock = {
      location: {
        hash: '',
      },
      addEventListener() {
      }
    };
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

  test('should render page when hashchange event is triggered.', (assert) => {
    const windowMock = {
      location: {
        hashchangeEventHandler: function () {
        },
        set hash(value) {
          this._hash = value;
          this.hashchangeEventHandler();
        },
        get hash() {
          return this._hash;
        }
      },
      addEventListener(event, eventHandler) {
        this.location.hashchangeEventHandler = eventHandler;
      }
    };
    const hashUrl = '/login';

    const router = new Router(windowMock, fixture, pageMapping);
    windowMock.location.hash = `#${hashUrl}`;

    const expectedUrlHash = windowMock.location.hash;
    const userForm = document.querySelector('[data-test="login-form"]');

    assert.strictEqual(expectedUrlHash.slice(1), hashUrl, 'Should set correct hash value.');
    assert.ok(fixture.contains(userForm), 'Should show existing page.');
  });
});
