import {Router} from '../app/router.js';
import {LoginFormComponent} from '../app/component/form-login';
import {ErrorPage} from '../app/pages/error-page';
import {RegistrationPage} from '../app/pages/registration-page';

const {module, test} = QUnit;

export default module('Router test', function (hook) {
  let fixture;
  
  hook.beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should throw error due to setting nonexistent default page', (assert) => {
    const pageMapping = {
      '/login': () => new LoginFormComponent(fixture),
    };
    assert.throws(() => {
      Router.builder().pageMapping(pageMapping).defaultUrl('/wrongUrl').build();
    }, 'Should throw error due to wrong default url.');
  });
  
  test('should render page when hashchange event is triggered.', (assert) => {
    const windowMock = _getWindowMock();
    windowMock.location.hash = '#/login';
    const hashUrl = '/registration';
    const pageMapping = {
      '/login': () => new LoginFormComponent(fixture),
      '/registration': () => new RegistrationPage(fixture),
    };
    Router.builder()
      .window(windowMock)
      .pageMapping(pageMapping)
      .appContainer(fixture)
      .build();
    windowMock.location.hash = `#${hashUrl}`;
    
    const userForm = fixture.querySelector('[data-test="registration-form"]');
    
    assert.ok(userForm, 'Should show existing page.');
  });
  
  test('should render page on application load.', (assert) => {
    const windowMock = _getWindowMock();
    const pageMapping = {
      '/login': () => new LoginFormComponent(fixture),
    };
    windowMock.location.hash = '#/login';
    Router.builder()
      .window(windowMock)
      .pageMapping(pageMapping)
      .appContainer(fixture)
      .build();
    const userForm = fixture.querySelector('[data-test="login-form"]');
    assert.ok(userForm, 'Should show existing page.');
  });
  
  test('should call dynamic hash part handler on load.', (assert) => {
    const windowMock = _getWindowMock();
    const pageMapping = {
      '/folder/:id': () => {
        return {};
      },
    };
    windowMock.location.hash = '#/folder/root';
    Router.builder()
      .window(windowMock)
      .pageMapping(pageMapping)
      .appContainer(fixture)
      .onDynamicHashChange(() => assert.step('DynamicPartChange'))
      .build();
    assert.verifySteps(['DynamicPartChange'], 'Should call dynamic hash part handler.');
  });
  
  test('should call dynamic hash part handler on hash change.', (assert) => {
    const windowMock = _getWindowMock();
    const pageMapping = {
      '/login': () => new LoginFormComponent(fixture),
      '/folder/:id': () => {
        return {};
      },
    };
    windowMock.location.hash = '#/login';
    const hashUrl = '#/folder/root';
    Router.builder()
      .window(windowMock)
      .pageMapping(pageMapping)
      .appContainer(fixture)
      .onDynamicHashChange(() => assert.step('DynamicPartChange'))
      .build();
    windowMock.location.hash = hashUrl;
    
    assert.verifySteps(['DynamicPartChange'], 'Should call dynamic hash part handler.');
  });
  
  test('should render error page on wrong hash.', (assert) => {
    const windowMock = _getWindowMock();
    const pageMapping = {
      '/login': () => new LoginFormComponent(fixture),
      '/404': () => new ErrorPage(fixture, 404, 'Error'),
    };
    windowMock.location.hash = '#/login';
    const wrongHash = '#/unknownHash';
    Router.builder()
      .window(windowMock)
      .pageMapping(pageMapping)
      .appContainer(fixture)
      .build();
    windowMock.location.hash = wrongHash;
    const errorPage = fixture.querySelector('[data-test="error-page"]');
    assert.ok(errorPage, 'Should render error page on wrong hash.');
  });
  
});

const _getWindowMock = () => {
  return {
    location: {
      hashchangeEventHandler: function () {
      },
      set hash(value) {
        this._hash = value;
        this.hashchangeEventHandler();
      },
      get hash() {
        return this._hash;
      },
    },
    addEventListener(event, eventHandler) {
      this.location.hashchangeEventHandler = eventHandler;
    },
  };
};
