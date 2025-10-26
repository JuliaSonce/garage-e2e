import { expect, Locator, Page } from '@playwright/test';
import { Component, PageHolder } from '../abstractClasses';
import SignUp from '../components/signUpForm.components';
import RestoreAccess from '../components/restoreAccessForm.components';

class Locators extends PageHolder {
    constructor(page: Page) { super(page); }
    container = this.page.getByRole('dialog');
    title = this.container.getByRole('heading', { name: "Log in" });
    emailInput = this.container.getByRole('textbox', { name: 'Email' });
    passwordInput = this.container.getByRole('textbox', { name: 'Password' });
    rememberMeCheckbox = this.container.getByRole('checkbox', { name: ' Remember me ' });
    forgotPasswordButton = this.container.getByRole('button', { name: 'Forgot password' });
    registrationButton = this.container.getByRole('button', { name: 'Registration' });
    loginButton = this.container.getByRole('button', { name: 'Login' });
    closeButton = this.container.locator('button[type="button"].close');
    emailErrorMessage = this.container.getByText("Email required");
    passwordErrorMessage = this.container.getByText("Password required")
    errorForInvalidData = this.container.getByText('Wrong email or password')

}

class Actions {

    constructor(
        private page: Page,
        private locators: Locators,
    ) { }


    async enterEmail(email: string): Promise<void> {
        await this.locators.emailInput.fill(email)
    }

    async enterPassword(password: string): Promise<void> {
        await this.locators.passwordInput.fill(password)
    }

    async clickLoginButton(): Promise<void> {
        await this.locators.loginButton.click()
    }

    async clickCloseButton(): Promise<void> {
        await this.locators.closeButton.click()
    }

    async checkRememberME(): Promise<void> {
        await this.locators.rememberMeCheckbox.check()
    }
    async clickForgotPasswordButton(): Promise<void> {
        await this.locators.forgotPasswordButton.click()
    }

    async openRegistration(): Promise<void> {
        await this.locators.registrationButton.click();
        const signUp = new SignUp(this.page, this.page.getByRole('dialog'));
        await signUp.check.verifyRegisterFormVisible();
    }

    async openRestoreAccess(): Promise<void> {
        await this.locators.forgotPasswordButton.click();
        const restoreAccess = new RestoreAccess(this.page, this.page.getByRole('dialog'));
        await restoreAccess.check.verifyRestoreAccessVisible();
    }

    async fillLoginData(email: string, password: string): Promise<void> {
        await this.locators.emailInput.fill(email)
        await this.locators.emailInput.press('Tab')
        await this.locators.passwordInput.fill(password)
        await this.locators.passwordInput.press('Tab')
    }

    // async closeAnyOpenModal(): Promise<void> {
    //     const signUp = new SignUp(this.page, this.page.getByRole('dialog'));
    //     // rest of your logic...
    // }
}

class Assertions {
    constructor(

        private locators: Locators,
    ) { }

    async verifyFormIsVisible(): Promise<void> {
        await expect(this.locators.container).toBeVisible()
        await expect(this.locators.title).toContainText("Log in")
    }

    async verifyAllElementsAreVisible(): Promise<void> {
        await expect(this.locators.emailInput).toBeVisible()
        await expect(this.locators.passwordInput).toBeVisible()
        await expect(this.locators.closeButton).toBeVisible()
        await expect(this.locators.loginButton).toBeVisible()
        await expect(this.locators.forgotPasswordButton).toBeVisible()
        await expect(this.locators.rememberMeCheckbox).toBeVisible()
        await expect(this.locators.registrationButton).toBeVisible()
    }

    async verifyEmailFieldAreVisible(): Promise<void> {
        await expect(this.locators.emailInput).toBeVisible()
    }

    async verifyPasswordFieldIsVisible(): Promise<void> {
        await expect(this.locators.passwordInput).toBeVisible()
    }

    async verifyLoginButtonToBeEnabled(): Promise<void> {
        await expect(this.locators.loginButton).toBeEnabled()
    }
    async verifyLoginButtonToBeDisabled(): Promise<void> {
        await expect(this.locators.loginButton).not.toBeEnabled()
    }

    async verifyEmailErrorVisible(): Promise<void> {
        await expect(this.locators.emailErrorMessage).toBeVisible()
        await expect(this.locators.emailErrorMessage).toContainText("Email required")
    }
    async verifyPasswordErrorVisible(): Promise<void> {
        await expect(this.locators.passwordErrorMessage).toBeVisible()
        await expect(this.locators.passwordErrorMessage).toContainText("Password required")
    }
    async verifyFormIsClosed(): Promise<void> {
        await expect(this.locators.container).toHaveCount(0);
    }

    async verifyRestoreAccessIsOpened(page: Page): Promise<void> {
        await expect(page.getByRole('heading', { name: 'Restore access' })).toBeVisible();
    }


    async verifyNoModalsVisible(page: Page): Promise<void> {
        await expect(page.getByRole('dialog')).toHaveCount(0);
    }

    async verifyErrorForIncorrectData(): Promise<void> {
        await expect(this.locators.errorForInvalidData).toBeVisible()
    }
}

export default class SignInForm extends Component {

    locators: Locators;
    do: Actions;
    check: Assertions;
    constructor(page: Page) {
        super(page);
        // this.formContainer = page.getByRole('dialog');
        this.locators = new Locators(page);
        this.do = new Actions(this.page, this.locators);
        this.check = new Assertions(this.locators);
    }
    async expectLoaded(): Promise<void> {
        await this.locators.container.isVisible();

    }
}




