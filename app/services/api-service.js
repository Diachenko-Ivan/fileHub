import {UserCredentials} from '../models/user-credentials';
import {ValidationError} from '../models/errors/validation-error';

export class ApiService {

  /**
   *
   * @param {UserCredentials} userCredentials
   */
  login(userCredentials) {

  }

  /**
   *
   * @param {UserCredentials} userCredentials
   */
  register(userCredentials) {
    return new Promise((resolve, reject) => {
      // resolve();
      reject(new ValidationError({
        errors: [{field:'login', message:'User with this login already exists.'}]
      }));

    });
  }

}
