/**
 * Abstract class that represents validation rule.
 */
export class ValidationRule {
  /**
   * Creates new validation rule.
   *
   * @param {string} message - message that is going to be showed if rule is failed.
   */
  constructor(message) {
    this.message = message;
  }

  /**
   * Validates credential value according to current rule.
   *
   * @param {string} credentialValue - password or login.
   */
  validate(credentialValue) {
  }
}

/**
 * Rule that checks if credential is empty.
 */
export class NotEmptyRule extends ValidationRule {
  /**
   * @inheritdoc
   */
  constructor(message) {
    super(message);
  }

  /**
   * @inheritdoc
   */
  validate(credentialValue) {
    return Boolean(credentialValue);
  }
}

/**
 * Rule that checks credential min length.
 */
export class MinLengthRule extends ValidationRule {
  /**
   * @inheritdoc
   */
  constructor(minLength, message) {
    super(message);
    this._minLength = minLength;
  }

  /**
   * @inheritdoc
   */
  validate(credentialValue) {
    return credentialValue.length >= this._minLength;
  }
}

/**
 * Rule that checks if credential suits to provided regexp.
 */
export class RegexpRule extends ValidationRule {
  /**
   * @inheritdoc
   */
  constructor(regexp, message) {
    super(message);
    this._regexp = new RegExp(regexp);
  }

  /**
   * @inheritdoc
   */
  validate(credentialValue) {
    return this._regexp.test(credentialValue);
  }
}
