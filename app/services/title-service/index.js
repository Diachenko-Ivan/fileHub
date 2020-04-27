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

  /**
   * Returns singleton instance of {@type TitleService}.
   *
   * @return {TitleService} singleton
   */
  static getInstance() {
    return titleService;
  }
}

/**
 * Single copy of {@type TitleService}.
 *
 * @type {TitleService}
 */
const titleService = new TitleService();
