import { test } from "@playwright/test"
import HomePage from "e2e/page_objects/home_page/HomePage"
import SignUpForm from "e2e/page_objects/home_page/components/SignUpForm"
import GaragePage from "../../../page_objects/garage_page/GaragePage";
import { generateUser } from "../../../utils/user_generator"


test.describe('User registration', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignUpButton()
        signUpForm = new SignUpForm(page, homePage.locators.registrationModal)

    })
    test('Verify that the input fields accept valid  data', async ({ page }) => {
        const user = generateUser();
        await signUpForm.check.verifyRegisterFormVisible()
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.do.clickRegisterButton()
        garagePage = new GaragePage(page)
        await garagePage.check.verifyGaragePageLoaded()

    })


})