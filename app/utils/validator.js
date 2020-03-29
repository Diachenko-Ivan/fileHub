import {ValidationError} from '../models/errors/validation-error';

/**
 * Validator for user`s credentials.
 */
export default class CredentialValidator {
  /**
   * @typedef Credential
   * @property {string} name - credential name.
   * @property {string} value - credential value.
   * @property {ValidationRule[]} rules - list of rules that credential value is going to be validated by.
   */
  /**
   * Validates user`s credential value according to credential pattern.
   *
   * @param {Credential[]} credentials - user`s credential.
   * @return {Promise} positive or negative result of credential validation.
   */
  validate(credentials) {
    return new Promise((resolve, reject) => {
      const errors = [];
      credentials.forEach(
          (credential) => {
            const failedRule = credential.rules
                .find((rule) => !rule.validate(credential.value));
            if (failedRule) {
              errors.push({field: credential.name, message: failedRule.message});
            }
          }
      );
      if (errors.length) {
        reject(new ValidationError({errors: errors}));
      }
      resolve();
    });
  }
}
