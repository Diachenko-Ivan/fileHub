import Toasted from '../../../node_modules/toastedjs/src/';

export class ToastService {
  
  show() {
    const toasted = new Toasted({position: 'top-center'});
    toasted.show('hello');
  }
}
