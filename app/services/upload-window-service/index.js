/**
 * Used for opening upload window.
 */
export class UploadWindowService {

  /**
   * Opens upload window.
   *
   * @param {Function} uploadHandler - function that is called when change event is invoked.
   */
  openUploadWindow(uploadHandler) {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.click();
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      uploadHandler(file);
    });
  }
}
