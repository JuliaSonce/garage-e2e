import { expect, Locator, Page } from '@playwright/test';
import { Component } from '../../abstract_classes/AbstractClasses';



class Locators {
    constructor(private container: Locator) { }
    modalContainer = this.container;
    title = this.container.getByRole('heading', { name: "Registration" });
    nameInputField = this.container.locator('input#signupName')
    lastNameInputField = this.container.locator('#signupLastName');
    signupEmail = this.container.getByLabel('Email')
    signupPassword = this.container.getByRole('textbox', { name: 'Password', exact: true });
    repeatPassword = this.container.getByLabel('Re-enter password')
    registerButton = this.container.getByRole('button', { name: "Register" })
    closeButton = this.container.getByRole('button', { name: 'Close' })
    nameErrorMessage = this.container.getByText("Name required");
    lastNameErrorMessage = this.container.getByText("Last name required");
    emailErrorMessage = this.container.getByText("Email required");
    passwordErrorMessage = this.container.getByText("Password required");
    reEnterPasswordErrorMessage = this.container.getByText("Re-enter password required");

}

class Actions {
    constructor(
        private locators: Locators,
    ) { }
    async fillRegistrationData(name: string, lastName: string, email: string, password: string): Promise<void> {
        await this.locators.nameInputField.fill(name)
        await this.locators.lastNameInputField.fill(lastName)
        await this.locators.signupEmail.fill(email)
        await this.locators.signupPassword.fill(password)
        await this.locators.repeatPassword.fill(password)
    }
    async enterName(name: string): Promise<void> {
        await this.locators.nameInputField.fill(name)
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.locators.lastNameInputField.fill(lastName)
    }
    async enterEmail(email: string): Promise<void> {
        await this.locators.signupEmail.fill(email)
    }

    async enterPassword(password: string): Promise<void> {
        await this.locators.signupPassword.fill(password)
    }

    async reEnterPassword(password: string): Promise<void> {
        await this.locators.repeatPassword.fill(password)
    }

    async clickRegisterButton(): Promise<void> {
        await this.locators.registerButton.click()
    }

    async clickCloseButton(): Promise<void> {
        await this.locators.closeButton.click()
    }

}




class Assertions {
    constructor(
        private locators: Locators,
    ) { }


    async verifyRegisterFormVisible(): Promise<void> {
        await expect(this.locators.modalContainer).toBeVisible()
        await expect(this.locators.title).toContainText("Registration")
    }

    async verifyAllElementsAreVisible(): Promise<void> {
        await expect(this.locators.nameInputField).toBeVisible();
        await expect(this.locators.lastNameInputField).toBeVisible();
        await expect(this.locators.signupEmail).toBeVisible();
        await expect(this.locators.signupPassword).toBeVisible();
        await expect(this.locators.repeatPassword).toBeVisible()
        await expect(this.locators.closeButton).toBeVisible();
        await expect(this.locators.registerButton).toBeVisible()
    }

    async verifyRegisterButtonToBeDisabled(): Promise<void> {
        await expect(this.locators.registerButton).not.toBeEnabled()
    }

    async verifyNoModalsVisible(): Promise<void> {
        await expect(this.locators.modalContainer).toHaveCount(0);
    }
    async verifyNameErrorVisible(): Promise<void> {
        await expect(this.locators.nameErrorMessage).toContainText("Name required")
    }
    async verifyLastNameErrorVisible(): Promise<void> {
        await expect(this.locators.lastNameErrorMessage).toContainText("Last name required")
    }
    async verifyEmailErrorVisible(): Promise<void> {
        await expect(this.locators.emailErrorMessage).toContainText("Email required")
    }


    async verifyPasswordErrorVisible(): Promise<void> {
        await expect(this.locators.passwordErrorMessage).toContainText("Password required")
    }

    async verifyReEnterPasswordErrorVisible(): Promise<void> {
        await expect(this.locators.reEnterPasswordErrorMessage).toContainText("Re-enter password required")
    }

}


export default class SignUpForm extends Component {
    private formContainer: Locator;
    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page, container: Locator) {
        super(page, container);
        this.formContainer = page.getByRole('dialog');
        this.locators = new Locators(this.formContainer);
        this.do = new Actions(this.locators);
        this.check = new Assertions(this.locators);
    }
    expectLoaded(): Promise<void> {
        return Promise.resolve();
    }
}




