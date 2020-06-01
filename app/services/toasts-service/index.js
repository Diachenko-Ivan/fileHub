/**
 * Used for showing pop-up messages.
 */
export class ToastService {
  /**
   * Instance for creation of pop-ups.
   * @type {Toasted}
   * @private
   */
  _toasted = new Toasted({position: 'top-right'});
  
  /**
   * Shows system error message.
   *
   * @param {string} message - message text.
   */
  showErrorMessage(message) {
    this._toasted.show(message, {
      type: 'error',
      action: {
        theme: 'alive',
        text: 'Ok',
        onClick: (e, toasted) => {
          toasted.delete();
        },
      },
    });
  }
}
