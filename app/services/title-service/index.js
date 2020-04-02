/**
 * Used for setting new title depending on page.
 */
export class TitleService {
  /**
   * Sets new page title.
   *
   * @param {string} title
   */
  setTitle(title) {
    document.title = title;
  }
}
