import RestoreAccessForm from 'e2e/app/components/restoreAccessForm.components'
import { test } from '../../../fixture'
import SignInForm from 'e2e/app/components/signInForm.components';





test.describe('Sign in form', () => {
    let restoreAccessForm: RestoreAccessForm;
    test.beforeEach(async ({ app }) => {

        //homePage = new HomePage(page);
        await app.homePage.open()
        await app.homePage.expectLoaded()
        await app.homePage.do.clickSignInButton()
        //signInForm = new SignInForm(page, homePage.locators.loginModal)
    })

    test.afterEach(async ({ app: { homePage } }) => {
        //await signInForm.do.closeAnyOpenModal()
        await homePage.signInForm.check.verifyNoModalsVisible(homePage.page)
    });

    test('Validates  visibility and functionality of elements, navigation actions in  "Sign in" Form', async ({ app }) => {
        await test.step('1: Validate form is visible', async () => {
            await app.signInForm.check.verifyFormIsVisible()
        })


        await test.step('2: Validate all elements are visible', async () => {
            await app.signInForm.check.verifyAllElementsAreVisible()

        })

        await test.step('3: Login button disabled by default', async () => {
            await app.signInForm.check.verifyLoginButtonToBeDisabled()
        })


        await test.step('4: Close modal and check it disappears', async () => {
            await app.signInForm.do.clickCloseButton()
            await app.signInForm.check.verifyFormIsClosed()
        })


        await test.step('5: Forgot password opens Restore Access modal', async () => {

            await app.homePage.do.clickSignInButton()
            await app.signInForm.do.clickForgotPasswordButton()
            await app.homePage.check.verifyRestoreFormVisible()
            restoreAccessForm = new RestoreAccessForm(app.page, app.homePage.locators.restoreAccessModal)
            await restoreAccessForm.do.clickCloseButton()
            await restoreAccessForm.check.verifyFormIsClosed()




        })
        await test.step('6: Registration button opens Registration modal', async () => {
            await app.homePage.do.clickSignInButton()
            await app.signInForm.do.openRegistration()
            await app.homePage.check.verifyRegistrationFormVisible()
            let registrationForm = new SignInForm(app.page)
            await registrationForm.do.clickCloseButton()
            await registrationForm.check.verifyFormIsClosed()

        });

    })
})