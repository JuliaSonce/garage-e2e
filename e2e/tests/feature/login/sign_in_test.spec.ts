import { test } from "../../../fixture";
import { validUser } from "@data/validUser";
import users from "@data/users.json";


test.describe('Sign in form', () => {
    test.beforeEach(async ({ app }) => {

        await app.homePage.open()
        await app.homePage.expectLoaded()
        await app.homePage.do.clickSignInButton()
    })
    test.afterEach(async ({ app }) => {
        await app.homePage.do.closeSafe()

    });

    test("Verify that valid login data leads to Garage page", async ({ app: { homePage, garagePage } }) => {

        await homePage.signInForm.do.fillLoginData(validUser.email, validUser.password)
        await homePage.signInForm.do.clickLoginButton()
        await garagePage.check.verifyGaragePageLoaded()
    });

    test('Invalid password shows error', async ({ app: { homePage } }) => {
        await homePage.signInForm.do.fillLoginData(users.invalidUsers[0].email, users.invalidUsers[0].password)
        await homePage.signInForm.do.clickLoginButton()
        await homePage.signInForm.check.verifyErrorForIncorrectData()

    })

    test('Invalid email shows error', async ({ app: { homePage } }) => {
        await homePage.signInForm.do.fillLoginData(users.invalidUsers[1].email, users.invalidUsers[1].password)
        await homePage.signInForm.do.clickLoginButton()
        await homePage.signInForm.check.verifyErrorForIncorrectData()
    })

    test('Empty Email shows error', async ({ app: { homePage } }) => {
        await homePage.signInForm.do.fillLoginData(users.invalidUsers[2].email, users.invalidUsers[2].password)
        await homePage.signInForm.check.verifyEmailErrorVisible()
    })
    test('Empty Password shows error', async ({ app: { homePage } }) => {
        await homePage.signInForm.do.fillLoginData(users.invalidUsers[3].email, users.invalidUsers[3].password)
        await homePage.signInForm.check.verifyPasswordErrorVisible()
    })
    test('Empty Email & Password show errors', async ({ app: { homePage } }) => {
        await homePage.signInForm.do.fillLoginData(users.invalidUsers[4].email, users.invalidUsers[4].password)
        await homePage.signInForm.check.verifyPasswordErrorVisible()
        await homePage.signInForm.check.verifyPasswordErrorVisible()

    })

})

