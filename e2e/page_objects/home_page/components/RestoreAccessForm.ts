import { expect, Locator, Page } from '@playwright/test';
import { Component } from '../../abstract_classes/AbstractClasses';



class Locators {
    constructor(private container: Locator) { }
    modalContainer = this.container;
    title = this.container.getByRole('heading', { name: "Restore access" });
    emailInputField = this.container.getByRole('textbox', { name: "Email" });
    sendButton = this.container.getByRole('button', { name: "Send" });
    closeButton = this.container.getByRole('button', { name: "Close" });
    emailErrorMessage = this.container.getByText("Email required");

}

class Actions {
    constructor(
        private locators: Locators,
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
    ) { }


    async verifyTitleIsValid(): Promise<void> {
        await expect(this.locators.title).toContainText("Restore access")
    }

    async verifyEmailFieldAreVisible(): Promise<void> {
        await expect(this.locators.emailInputField).toBeVisible()
    }

    async verifyFormIsClosed(): Promise<void> {
        await expect(this.locators.modalContainer).toHaveCount(0);
    }

    async verifySendButtonToBeDisabled(): Promise<void> {
        await expect(this.locators.sendButton).not.toBeEnabled()
    }
    async verifySendButtonToBeEnabled(): Promise<void> {
        await expect(this.locators.sendButton).toBeEnabled()
    }
}

export default class RestoreAccessForm extends Component {
    private formContainer: Locator;
    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page, container: Locator) {
        super(page, container);
        this.formContainer = page.locator('.modal-content');
        this.locators = new Locators(this.formContainer);
        this.do = new Actions(this.locators);
        this.check = new Assertions(this.locators);
    }
    expectLoaded(): Promise<void> {
        return Promise.resolve();
    }
}




