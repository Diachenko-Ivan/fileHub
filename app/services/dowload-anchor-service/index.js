/**
 * Used for creating download anchor.
 */
export class DownloadAnchorService {
  /**
   * Creates download anchor for starting file download.
   *
   * @param {DownloadFileObject} fileObject - downloaded file.
   */
  createAndClickDownloadAnchor(fileObject) {
    const anchor = document.createElement('a');
    const fileUrl = URL.createObjectURL(fileObject.file);
    anchor.setAttribute('href', fileUrl);
    anchor.setAttribute('download', fileObject.model.name);
    anchor.click();
  }
}
