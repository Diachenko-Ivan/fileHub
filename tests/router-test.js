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
    '/folder/:id': () => {
      return {};
    },
  };
  
  hook.beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
  });
  
  test('should throw error due to setting nonexistent default page', (assert) => {
    assert.throws(() => {
      Router.builder().defaultUrl('/wrongUrl').build();
    }, 'Should throw error due to wrong default url.');
  });
  
  test('should render page when hashchange event is triggered.', (assert) => {
    const windowMock = _getWindowMock();
    windowMock.location.hash = '#/login';
    const hashUrl = '/registration';
    
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
