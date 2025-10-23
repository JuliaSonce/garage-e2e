import { expect, Page, Locator } from '@playwright/test';
import { AppPage } from '../abstractClasses'
import Header from '../components/header.components';

class Locators {
    constructor(private page: Page) { }
    headerComponent = this.page.locator('app-header > header');
    logOutButton = this.page.getByRole('button', { name: 'Log out' });
    addCarButton = this.page.getByRole('button', { name: 'Add car' });
    addCarModal = this.page.locator('.modal-content');
    garagePanelName = this.page.getByRole('heading', { name: 'Garage' })
}

class Actions {
    constructor(
        private page: Page,
        private locators: Locators) { }

    async clickAddCar() {
        await this.locators.addCarButton.click();
    }


}

class Assertions {
    constructor(private page: Page, private locators: Locators) { }

    async verifyGaragePageLoaded() {
        await expect(this.page).toHaveURL(/.*garage/);
        await expect(this.locators.garagePanelName).toContainText("Garage")

    }

    async verifyAddCarModalVisible() {
        await expect(this.locators.addCarModal).toBeVisible();
    }

}

export default class GaragePage extends AppPage {
    pagePath = '/panel/garage';
    header: Header;
    locators: Locators;
    do: Actions;
    check: Assertions;

    constructor(page: Page) {
        super(page);

        const locators = new Locators(page);
        this.locators = locators;
        const headerLocator = locators.headerComponent;
        this.header = new Header(page, headerLocator);
        this.do = new Actions(page, locators);
        this.check = new Assertions(page, locators);
    }


    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/.*garage/);
        await this.check.verifyGaragePageLoaded();
    }
}