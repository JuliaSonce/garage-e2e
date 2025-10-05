import { test, expect } from "@playwright/test"
import HomePage from "../../../page_objects/home_page/HomePage"
import SignInForm from "../../../page_objects/home_page/components/SignInForm"
import users from "../../../test-data/users.json"
import GaragePage from "e2e/page_objects/garage_page/GaragePage";


test.describe('Sign in form', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;



    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open()
        await homePage.expectLoaded()
        await homePage.do.clickSignInButton()
        signInForm = new SignInForm(page, homePage.locators.loginModal)
    })
    test.afterEach(async ({ page }) => {
        await homePage.do.closeSafe()

    });

    test("Verify that valid login data leads to Garage page", async ({ page }) => {
        garagePage = new GaragePage(page);
        await signInForm.do.fillLoginData(users.validUsers[0].email, users.validUsers[0].password)
        await signInForm.do.clickLoginButton()
        await garagePage.check.verifyGaragePageLoaded()
    });

    test('Invalid password shows error', async () => {
        await signInForm.do.fillLoginData(users.invalidUsers[0].email, users.invalidUsers[0].password)
        await signInForm.do.clickLoginButton()
        await signInForm.check.verifyErrorForIncorrectData()

    })

    test('Invalid email shows error', async () => {
        await signInForm.do.fillLoginData(users.invalidUsers[1].email, users.invalidUsers[1].password)
        await signInForm.do.clickLoginButton()
        await signInForm.check.verifyErrorForIncorrectData()
    })

    test('Empty Email shows error', async () => {
        await signInForm.do.fillLoginData(users.invalidUsers[2].email, users.invalidUsers[2].password)
        await signInForm.check.verifyEmailErrorVisible()
    })
    test('Empty Password shows error', async () => {
        await signInForm.do.fillLoginData(users.invalidUsers[3].email, users.invalidUsers[3].password)
        await signInForm.check.verifyPasswordErrorVisible()
    })
    test('Empty Email & Password show errors', async () => {
        await signInForm.do.fillLoginData(users.invalidUsers[4].email, users.invalidUsers[4].password)
        await signInForm.check.verifyPasswordErrorVisible()
        await signInForm.check.verifyPasswordErrorVisible()

    })

})

