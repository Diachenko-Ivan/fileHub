/**
 * Rule that checks if credential is empty.
 */
export class NotEmptyRule {
  validate(credentialValue) {
    return credentialValue === 'true';
  }
}

/**
 * Rule that checks credential min length.
 */
export class MinLengthRule {
  constructor(minLength) {
    this._minLength = minLength;
  }

  validate(credentialValue) {
    return credentialValue.length > this._minLength;
  }
}

/**
 * Rule that checks if credential suits to provided regexp.
 */
export class RegexpRule {
  constructor(regexp) {
    this._regexp = new RegExp(regexp);
  }

  validate(credentialValue) {
    return this._regexp.test(credentialValue);
  }
}
