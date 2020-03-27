import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';
import {ValidationErrorCase} from '../models/errors/validation-error-case';
import {GeneralServerError} from '../models/errors/server-error';

export class ApiService {
  /**
   * Tries to authenticate user and returns result of authentication.
   *
   * @param {UserCredentials} userCredentials - user`s login form credentials.
   * @return {Promise} result of login.
   */
  login(userCredentials) {
    return new Promise(((resolve, reject) => {
      resolve();
      reject(new GeneralServerError('No user registered with this login.'));
    }));
  }

  /**
   * Tries to register new user and returns result of registration.
   *
   * @param {UserCredentials} userCredentials - user`s registration form credentials.
   * @return {Promise} result of registration.
   */
  register(userCredentials) {
    return new Promise((resolve, reject) => {
      resolve();
      reject(new ValidationError({
        errors: [new ValidationErrorCase({field: 'login', message: 'User with this login already exists.'}),
          new ValidationErrorCase({field: 'password', message: 'No special symbol.'})],
      }));
    });
  }
}
