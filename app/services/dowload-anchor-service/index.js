/**
 * Used for creating download anchor.
 */
export class DownloadAnchorService {
  /**
   * Creates download anchor for starting file download.
   *
   * @param {Blob | File} file - downloaded file.
   */
  createAndClickDownloadAnchor(file) {
    const anchor = document.createElement('a');
    const fileUrl = URL.createObjectURL(file);
    anchor.setAttribute('href', fileUrl);
    anchor.setAttribute('download', 'file');
    anchor.click();
  }
}