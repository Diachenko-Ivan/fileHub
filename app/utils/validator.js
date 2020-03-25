/**
 * Validator for user`s credentials.
 */
export default class CredentialValidator {
  /**
   * Pattern by which login will be validated.
   *
   * @type {{regexp: {message: string, value: string}, minLength: number, credentialName: string}}
   */
  loginPattern = {
    credentialName: 'Login',
    minLength: 4,
    regexp: {
      value: `^([a-zA-Z0-9]){4,}$`,
      message: 'Login should have uppercase' +
          ' or lowercase letters and digits.',
    },
  };

  /**
   * Pattern by which password will be validated.
   *
   * @type {{regexp: {message: string, value: string}, minLength: number, credentialName: string}}
   */
  passwordPattern = {
    credentialName: 'Password',
    minLength: 8,
    regexp: {
      value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[0-9a-zA-Z]{8,}$',
      message: 'Password should have at least one uppercase' +
          ' and lowercase letter and digit.',
    },
  };

  /**
   * Enumerates all allowed credential patterns.
   *
   * @enum {string}
   */
  Pattern = {
    LOGIN: 'loginPattern',
    PASSWORD: 'passwordPattern',
  };

  /**
   * Validates user`s credential value according to credential pattern.
   *
   * @param {string} credential - user`s credential.
   * @param {Pattern} credentialPattern - pattern by which credential will be validated.
   * @return {Promise} positive or negative result of credential validation.
   */
  validate(credential, credentialPattern) {
    const pattern = this[credentialPattern];
    const credentialRegexp = new RegExp(pattern.regexp.value);

    return new Promise((resolve, reject) => {
      if (!credential) {
        reject(new TypeError(`${pattern.credentialName} can't be empty.`));
      }
      if (credential.length < pattern.minLength) {
        reject(new TypeError(`Minimal length ${pattern.minLength} chars.`));
      }
      if (!credentialRegexp.test(credential)) {
        reject(new TypeError(pattern.regexp.message));
      }
      resolve(`${pattern.credentialName} validated`);
    });
  }
}
