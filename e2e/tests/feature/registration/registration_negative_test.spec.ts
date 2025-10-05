import { test, expect } from "@playwright/test"
import HomePage from "e2e/page_objects/home_page/HomePage"
import SignUpForm from "e2e/page_objects/home_page/components/SignUpForm"
import GaragePage from "../../../page_objects/garage_page/GaragePage"
import { generateUser } from "e2e/utils/user_generator";


test.describe("User registration - negative flow", () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignUpButton()
        signUpForm = new SignUpForm(page, homePage.locators.registrationModal)

    })

    test("Passwords to short", async () => {
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        user.password = "Abs1"
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.do.triggerValidation()
        await signUpForm.check.verifyPasswordTooShortVisible()


    })
    test('Invalid email shows error', async () => {
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        user.email = "invalidJohn@"
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.check.verifyEmailErrorVisible()
    })
    test("Spaces in Email field", async () => {
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        user.email = "invalid  John@"
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.check.verifyEmailErrorVisible()
    })

    test('Special characters in name field', async () => {
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        user.firstName = "John#$%"
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.check.verifyInvalidNameErrorVisible()
    })
    test("Shows 'User already exists' error", async () => {
        await signUpForm.check.verifyRegisterFormVisible()
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        user.email = "TestTestowichyou@gmail.com"
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.do.clickRegisterButton()
        await signUpForm.check.verifyUserAlreadyExistsErrorVisible()

    })
    test("Passwords do not match", async ({ page }) => {
        await signUpForm.check.verifyRegisterFormVisible()
        const user = generateUser()
        await signUpForm.do.fillRegistrationData(user.firstName, user.lastName, user.email, user.password)
        await signUpForm.do.reEnterPassword("invalidJohn@111")
        await signUpForm.check.verifyPasswordNotMatchError()

    })

    test('Sign up form shows required errors when fields are left empty', async ({ page }) => {
        await signUpForm.check.verifyRegisterFormVisible();
        await signUpForm.do.triggerEmptyFieldValidation();
        await signUpForm.check.verifyAllRequiredErrorsVisible();
        await signUpForm.check.verifyRegisterButtonToBeDisabled();
    });


});



