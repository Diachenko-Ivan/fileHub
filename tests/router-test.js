import {Router} from "../app/router.js";
import {LoginFormComponent} from "../app/pages/from-login";

const {module, test} = QUnit;

export default module('Router test', function (hook) {
    let fixture;
    const pageMapping = {
        '/login': () => new LoginFormComponent(fixture)
    };

    hook.beforeEach(() => {
        fixture = document.getElementById('qunit-fixture');
        this.router = new Router(fixture, pageMapping);
    });

    test('should generate existing page', (assert) => {
        this.router.generatePage('/login');
        let errorPage = document.getElementById('error-page');
        let userForm = document.querySelector('.user-form');

        assert.notOk(fixture.contains(errorPage), 'Should not show error page.');
        assert.ok(fixture.contains(userForm), 'Should show correct existing page.');
    });

    test('should generate error page due to wrong url', (assert) => {
        this.router.generatePage('/wrongUrl');
        let errorPage = document.getElementById('error-page');

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
        let expectedurlHash = window.location.hash.slice(1);

        assert.strictEqual(expectedurlHash, hashUrl, 'Should set correct hash value.');
    });
});
