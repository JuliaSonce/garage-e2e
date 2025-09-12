import { test } from "@playwright/test"
import SignUpForm from "../../../page_objects/home_page/components/SignUpForm"
import HomePage from "../../../page_objects/home_page/HomePage"


test.describe("Validation Registration Form", async () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignUpButton()
        signUpForm = new SignUpForm(page, homePage.locators.registrationModal)

    })
    test('Validates  visibility and functionality of elements, navigation actions in  "Sign Up" Form', async () => {
        await test.step('1: Validate registration form is visible', async () => {
            await signUpForm.check.verifyRegisterFormVisible()
        })
        await test.step('2: Validate all elements are visible', async () => {
            await signUpForm.check.verifyAllElementsAreVisible()
        })
        await test.step('3: Register button disabled by default', async () => {
            await signUpForm.check.verifyRegisterButtonToBeDisabled()
        })
        await test.step('4: Close registration form and check it disappears', async () => {
            await signUpForm.do.clickCloseButton()
            await signUpForm.check.verifyNoModalsVisible()
        })

    })
})