import { expect, Locator, Page } from '@playwright/test';
import { AppPage } from '../abstractClasses';
import Header from '../components/header.components';
import SignInForm from '../components/signInForm.components';
import RestoreAccessForm from '../components/restoreAccessForm.components';
import SignUpForm from '../components/signUpForm.components';
import { validUser } from "@data/validUser";


class Locators {
    constructor(private page: Page) { }
    headerComponent = this.page.locator('app-header > header');
    aboutSection = this.page.locator('#aboutSection');
    contactsSection = this.page.locator('#contactsSection');
    restoreAccessModal = this.page.getByRole('dialog').getByRole('document').locator('div').filter({
        hasText: 'Restore access×EmailSend'
    });
    loginModal = this.page.getByRole('dialog').getByRole('document').locator('div').filter({
        hasText: 'Log in×Wrong email or'
    });
    registrationModal = this.page.getByRole('dialog').getByRole('document').locator('div').filter({
        hasText: 'Registration×NameLast'
    });
    modalDialog = this.page.getByRole('dialog');
    closeButton = this.modalDialog.locator('button[type="button"].close');
    signUpButton = this.page.getByRole('button', { name: "Sign up" });

}

class Actions {

    openRegistrationModal() {
        throw new Error('Method not implemented.');
    }
    page: any;
    constructor(private locators: Locators, private header: Header, private signInForm: SignInForm) { }

    async clickAboutAndScrollToSection(): Promise<void> {
        await this.header.do.clickOnAboutButton();
    }

    async clickContactsButtonAndScrollToSection(): Promise<void> {
        await this.header.do.clickOnContactsButton();
    }

    async clickGuestLoginButtonRedirectToGuestPage(): Promise<void> {
        await this.header.check.isGuestLoginButtonEnabled();
        await this.header.do.clickOnGuestLoginButton();
    }

    async clickSignInButton(): Promise<void> {
        await this.header.do.clickOnSignInButton();
    }

    async clickSignUpButton(): Promise<void> {
        await this.locators.signUpButton.click()
    }
    async closeSafe(): Promise<void> {
        const count = await this.locators.modalDialog.count();
        if (count === 0) return;
        if (!(await this.locators.modalDialog.isVisible().catch(() => false))) return;

        if (await this.locators.closeButton.isVisible().catch(() => false)) {
            await this.locators.closeButton.click();
        } else {
            // Фолбек: якщо немає кнопки/оверлею, просто ESC
            await this.page.keyboard.press('Escape').catch(() => { });
        }

        // Best-effort: коротко чекаємо на приховування, але не падаємо на навігації
        await this.locators.modalDialog
            .waitFor({ state: 'hidden', timeout: 1000 })
            .catch(() => { });
    }

    async loginRegisteredUser(): Promise<void> {
        await this.header.do.clickOnSignInButton();
        await this.signInForm.do.fillLoginData(validUser.email, validUser.password);
        await this.signInForm.do.clickLoginButton();



    }
}
class Assertions {
    constructor(private locators: Locators, private header: Header, private signInForm: SignInForm) { }

    async verifyPageHeader(): Promise<void> {
        await this.header.check.allHeaderElementsAreVisibleOnHomePage();
    }

    async verifyHomeButtonIsActive(): Promise<void> {
        await this.header.check.homeButtonIsActive();
    }

    async verifyAboutButtonScrollsToSection(): Promise<void> {
        await expect(this.locators.aboutSection).toBeVisible();
        await expect(this.locators.aboutSection).toContainText('Instructions and manuals');
    }

    async verifyContactsButtonScrollsToSection(): Promise<void> {
        await expect(this.locators.contactsSection).toBeVisible();
        await expect(this.locators.contactsSection).toContainText('Contacts');
    }

    async verifySignInModalVisible(): Promise<void> {
        await expect(this.locators.loginModal).toBeVisible();
        await expect(this.locators.loginModal).toContainText('Log in');

    }
    async verifySignInButtonVisibleAndEnabled(): Promise<void> {
        expect(this.header.check.signInButtonIsEnabled())
    }
    async verifyRestoreFormVisible(): Promise<void> {
        await expect(this.locators.restoreAccessModal).toBeVisible();
        await expect(this.locators.restoreAccessModal).toContainText('Restore access');

    }

    async verifyRegistrationFormVisible(): Promise<void> {
        await expect(this.locators.registrationModal).toBeVisible();
        await expect(this.locators.registrationModal).toContainText('Registration');

    }

}

export default class HomePage extends AppPage {
    public pagePath = 'https://qauto2.forstudy.space';

    header: Header;
    signInForm: SignInForm;
    signUpForm: SignUpForm;
    restoreAccessForm: RestoreAccessForm;
    locators: Locators;
    do: Actions;
    check: Assertions;

    constructor(page: Page) {
        super(page);
        this.signInForm = new SignInForm(page);
        this.signUpForm = new SignUpForm(page);
        this.restoreAccessForm = new RestoreAccessForm(page);
        this.locators = new Locators(page);
        this.header = new Header(page, this.locators.headerComponent);
        this.do = new Actions(this.locators, this.header, this.signInForm);
        this.check = new Assertions(this.locators, this.header, this.signInForm);
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle('Hillel Qauto');
    }

    // async doSomething() {
    //     await this.page.goto('https://qauto2.forstudy.space');
    // }
}
