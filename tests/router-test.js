import {Router} from '../app/router.js';
import {LoginFormComponent} from '../app/component/form-login';
import {ErrorPage} from '../app/pages/error-page';
import {RegistrationPage} from '../app/pages/registration-page';

const {module, test} = QUnit;

export default module('Router test', function (hook) {
  let fixture;
  const pageMapping = {
    '/login': () => new LoginFormComponent(fixture),
    '/404': () => new ErrorPage(fixture, 404, 'Error'),
    '/registration': () => new RegistrationPage(fixture),
    '/folder/:id': () => {return {}},
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

  test('should throw error due to setting nonexistent default page', (assert) => {
    assert.throws(() => {
      this.router.defaultUrl = '/wrongUrl';
    }, 'Should throw error due to wrong default url.');
  });

  test('should set existing default hash.', (assert) => {
    const hashUrl = '/login';
    this.router.defaultUrl = hashUrl;

    const expectedUrlHash = this.router.defaultUrl;

    assert.strictEqual(expectedUrlHash, hashUrl, 'Should set correct hash value.');
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
    const hashUrl = '/registration';

    const router = new Router(windowMock, fixture, pageMapping);

    windowMock.location.hash = `#${hashUrl}`;
    
    const userForm = fixture.querySelector('[data-test="registration-form"]');

    assert.ok(userForm, 'Should show existing page.');
  });
  
  test('should render page on application load.', (assert) => {
    const windowMock = {
      location: {
        hash: '#/login',
        hashchangeEventHandler: function () {
        },
      },
      addEventListener(event, eventHandler) {
        this.location.hashchangeEventHandler = eventHandler;
      }
    };
    
    const router = new Router(windowMock, fixture, pageMapping);

    router.checkHashOnLoad();
    
    const userForm = fixture.querySelector('[data-test="login-form"]');
    assert.ok(userForm, 'Should show existing page.');
  });
  
  test('should call dynamic hash part handler on load.', (assert) => {
    const windowMock = {
      location: {
        hash: '#/folder/root',
        hashchangeEventHandler: function () {
        },
      },
      addEventListener(event, eventHandler) {
        this.location.hashchangeEventHandler = eventHandler;
      }
    };
    
    const router = new Router(windowMock, fixture, pageMapping);
    router.onDynamicPartChange(() => assert.step('DynamicPartChange'));
    router.checkHashOnLoad();
    
    assert.verifySteps(['DynamicPartChange'], 'Should call dynamic hash part handler.');
  });
  
  test('should call dynamic hash part handler on hash change.', (assert) => {
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
    const hashUrl = '#/folder/root';
    
    const router = new Router(windowMock, fixture, pageMapping);
    router.onDynamicPartChange(() => assert.step('DynamicPartChange'));
    windowMock.location.hash = hashUrl;
    
    assert.verifySteps(['DynamicPartChange'], 'Should call dynamic hash part handler.');
  });
});
