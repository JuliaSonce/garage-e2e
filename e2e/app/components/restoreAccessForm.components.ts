import { expect, Locator, Page } from '@playwright/test';
import { Component, PageHolder } from '../abstractClasses';



class Locators extends PageHolder {
    constructor(page: Page) { super(page); }
    container = this.page.locator('.modal-content');
    title = this.container.getByRole('heading', { name: "Restore access" });
    emailInputField = this.container.getByRole('textbox', { name: "Email" });
    sendButton = this.container.getByRole('button', { name: "Send" });
    closeButton = this.container.getByRole('button', { name: "Close" });
    emailErrorMessage = this.container.getByText("Email required");

}

class Actions {
    constructor(
        private locators: Locators,
        private page: Page,
    ) { }


    async enterEmail(email: string): Promise<void> {
        await this.locators.emailInputField.fill(email)
    }

    async clickSendButton(): Promise<void> {
        await this.locators.sendButton.click()
    }

    async clickCloseButton(): Promise<void> {
        await this.locators.closeButton.click()
    }

}




class Assertions {
    verifyRestoreAccessVisible() {
        throw new Error('Method not implemented.');
    }
    constructor(
        private locators: Locators,
        private page: Page,
    ) { }


    async verifyTitleIsValid(): Promise<void> {
        await expect(this.locators.title).toContainText("Restore access")
    }

    async verifyEmailFieldAreVisible(): Promise<void> {
        await expect(this.locators.emailInputField).toBeVisible()
    }

    async verifyFormIsClosed(): Promise<void> {
        await expect(this.locators.container).toHaveCount(0);
    }

    async verifySendButtonToBeDisabled(): Promise<void> {
        await expect(this.locators.sendButton).not.toBeEnabled()
    }
    async verifySendButtonToBeEnabled(): Promise<void> {
        await expect(this.locators.sendButton).toBeEnabled()
    }
}

export default class RestoreAccessForm extends Component {

    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page) {
        super(page);
        this.locators = new Locators(page);
        this.do = new Actions(this.locators, this.page);
        this.check = new Assertions(this.locators, this.page);
    }
    async expectLoaded(): Promise<void> {
        await this.locators.container.isVisible();
    }
}




