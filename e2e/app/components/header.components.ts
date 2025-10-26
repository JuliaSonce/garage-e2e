import { expect, Locator, Page } from '@playwright/test';
import { Component } from '../abstractClasses';

class Locators {
    constructor(private container: Locator) { }

    logo = this.container.locator('.header_logo');
    homeButton = this.container.locator('a.header-link', { hasText: 'Home' });
    aboutButton = this.container.locator('button.header-link', { hasText: 'About' });
    contactsButton = this.container.locator('button.header-link', { hasText: 'Contacts' });
    guestLoginButton = this.container.locator('button.header-link.-guest');
    signInButton = this.container.locator('button.btn-outline-white.header_signin');
}

class Actions {
    constructor(
        private locators: Locators,
    ) { }

    async clickOnAboutButton(): Promise<void> {
        await this.locators.aboutButton.click();
    }

    async clickOnContactsButton(): Promise<void> {
        await this.locators.contactsButton.click();
    }

    async clickOnGuestLoginButton(): Promise<void> {
        await this.locators.guestLoginButton.click();
    }
    async clickOnSignInButton(): Promise<void> {
        await this.locators.signInButton.click({ force: true })
    }

}

class Assertions {
    constructor(
        private locators: Locators,
    ) { }

    async allHeaderElementsAreVisibleOnHomePage(): Promise<void> {
        await expect(this.locators.logo).toBeVisible();
        await expect(this.locators.homeButton).toBeVisible();
        await expect(this.locators.homeButton).toHaveText("Home");
        await expect(this.locators.aboutButton).toBeVisible();
        await expect(this.locators.aboutButton).toHaveText("About");
        await expect(this.locators.contactsButton).toBeVisible();
        await expect(this.locators.contactsButton).toHaveText("Contacts");
        await expect(this.locators.guestLoginButton).toBeVisible();
        await expect(this.locators.guestLoginButton).toHaveText("Guest log in");
        await expect(this.locators.signInButton).toBeVisible();
        await expect(this.locators.signInButton).toHaveText('Sign In');
    }

    async homeButtonIsActive(): Promise<void> {
        await expect(this.locators.homeButton).toHaveClass(/-active/);
    }

    async isGuestLoginButtonEnabled(): Promise<void> {
        await expect(this.locators.guestLoginButton).toBeEnabled();
    }

    async signInButtonIsEnabled(): Promise<void> {
        await expect(this.locators.signInButton).toBeEnabled();
    }
}

export default class Header extends Component {
    private headerContainer: Locator;
    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page, container: Locator) {
        super(page, container);
        this.headerContainer = page.locator('app-header > header');
        this.locators = new Locators(this.headerContainer);
        this.do = new Actions(this.locators);
        this.check = new Assertions(this.locators);
    }
    expectLoaded(): Promise<void> {
        return Promise.resolve(); // placeholder
    }
}



