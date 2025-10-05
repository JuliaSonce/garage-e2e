import { test } from "@playwright/test"
import SignUpForm from "../../../page_objects/home_page/components/SignUpForm"
import HomePage from "../../../page_objects/home_page/HomePage"
import { generateUser } from "e2e/utils/user_generator";
import GaragePage from "../../../page_objects/garage_page/GaragePage";


test.describe("Validation Registration Form", async () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignUpButton()
        signUpForm = new SignUpForm(page, homePage.locators.registrationModal)
        await signUpForm.check.verifyRegisterFormVisible()
    })
    test('Validates  visibility and functionality of elements, navigation actions in  "Sign Up" Form', async ({ page }) => {
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
        await test.step('5: Verify that the input fields accept valid  data', async () => {
            await homePage.do.clickSignUpButton()
            await signUpForm.check.verifyRegisterFormVisible()
            const user = generateUser();
            await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
            await signUpForm.do.clickRegisterButton()
            garagePage = new GaragePage(page)
            await garagePage.check.verifyGaragePageLoaded()
        })

    })
})