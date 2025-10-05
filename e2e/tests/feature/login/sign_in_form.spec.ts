import { test, expect } from "@playwright/test"
import HomePage from "../../../page_objects/home_page/HomePage"
import SignInForm from "../../../page_objects/home_page/components/SignInForm"
import RestoreAccessForm from "../../../page_objects/home_page/components/RestoreAccessForm"
import SignUpForm from "../../../page_objects/home_page/components/SignUpForm"



test.describe('Sign in form', async () => {
    let homePage: HomePage;
    let signInForm: SignInForm;



    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignInButton()
        signInForm = new SignInForm(page, homePage.locators.loginModal)
    })

    test.afterEach(async ({ page }) => {
        //await signInForm.do.closeAnyOpenModal()
        await signInForm.check.verifyNoModalsVisible(page)
    });

    test('Validates  visibility and functionality of elements, navigation actions in  "Sign in" Form', async ({ page }) => {
        await test.step('1: Validate form is visible', async () => {
            await signInForm.check.verifyFormIsVisible()
        })


        await test.step('2: Validate all elements are visible', async () => {
            await signInForm.check.verifyAllElementsAreVisible()

        })

        await test.step('3: Login button disabled by default', async () => {
            await signInForm.check.verifyLoginButtonToBeDisabled()
        })


        await test.step('4: Close modal and check it disappears', async () => {
            await signInForm.do.clickCloseButton()
            await signInForm.check.verifyFormIsClosed()
        })


        await test.step('5: Forgot password opens Restore Access modal', async () => {
            await homePage.do.clickSignInButton()
            await signInForm.do.clickForgotPasswordButton()
            await homePage.check.verifyRestoreFormVisible()
            let restoreAccessForm = new RestoreAccessForm(page, homePage.locators.restoreAccessModal)
            await restoreAccessForm.do.clickCloseButton()
            await restoreAccessForm.check.verifyFormIsClosed()




        })
        await test.step('6: Registration button opens Registration modal', async () => {
            await homePage.do.clickSignInButton()
            await signInForm.do.openRegistration()
            await homePage.check.verifyRegistrationFormVisible()
            let registrationForm = new SignInForm(page, homePage.locators.registrationModal)
            await registrationForm.do.clickCloseButton()
            await registrationForm.check.verifyFormIsClosed()

        });

    })
})