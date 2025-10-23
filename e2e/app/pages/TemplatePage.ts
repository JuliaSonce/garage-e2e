import { expect, Page } from '@playwright/test'
import { AppPage } from './AbstractClasses';

class Selectors {
    // Selectors defined here
    // title = '[data-test-id="search-headline"]';
    // cookieAcceptButton = 'button:has-text("Accept")';

}

class Actions {
    constructor(
        private page: Page,
        private selectors: Selectors
    ) { };

    // Actions written here
    // async acceptCookies(): Promise<void> {
    //     await this.page.locator(this.selectors.cookieAcceptButton).click();
    // };

}

class Assertions {
    constructor(
        private page: Page,
        private selectors: Selectors
    ) { };

    // Check assertions goes here
    // async verifyCookiesShown(): Promise<void> {
    //     await expect(this.page.locator(this.selectors.cookieAcceptButton)).toBeVisible;
    // }
}


export default class PAGE_CLASS_NAME extends AppPage {
    public pagePath: string = 'PAGE PATH HERE'

    expectLoaded(): Promise<void> {
        // Add methods to check when page is loaded
        // like expect(this.page).toHaveTitle('TITLE')
        return Promise.resolve();
    }

    selectors = new Selectors();
    do = new Actions(this.page, this.selectors)
    check = new Assertions(this.page, this.selectors)
}
