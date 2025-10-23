import { test } from "../../../fixture";
import { validUser } from "@data/validUser";
import users from "@data/users.json";
import SignInForm from "../../../app/components/signInForm.components";


test.describe('Sign in form', () => {
    let signInForm: SignInForm;
    test.beforeEach(async ({ app }) => {

        await app.homePage.open()
        await app.homePage.expectLoaded()
        await app.homePage.do.clickSignInButton()
        signInForm = new SignInForm(app.page, app.homePage.locators.loginModal)
    })
    test.afterEach(async ({ app }) => {
        await app.homePage.do.closeSafe()

    });

    test("Verify that valid login data leads to Garage page", async ({ app }) => {

        await app.signInForm.do.fillLoginData(validUser.email, validUser.password)
        await app.signInForm.do.clickLoginButton()
        await app.garagePage.check.verifyGaragePageLoaded()
    });

    test('Invalid password shows error', async ({ app }) => {
        await app.signInForm.do.fillLoginData(users.invalidUsers[0].email, users.invalidUsers[0].password)
        await app.signInForm.do.clickLoginButton()
        await app.signInForm.check.verifyErrorForIncorrectData()

    })

    test('Invalid email shows error', async ({ app }) => {
        await app.signInForm.do.fillLoginData(users.invalidUsers[1].email, users.invalidUsers[1].password)
        await app.signInForm.do.clickLoginButton()
        await app.signInForm.check.verifyErrorForIncorrectData()
    })

    test('Empty Email shows error', async ({ app }) => {
        await app.signInForm.do.fillLoginData(users.invalidUsers[2].email, users.invalidUsers[2].password)
        await app.signInForm.check.verifyEmailErrorVisible()
    })
    test('Empty Password shows error', async ({ app }) => {
        await app.signInForm.do.fillLoginData(users.invalidUsers[3].email, users.invalidUsers[3].password)
        await app.signInForm.check.verifyPasswordErrorVisible()
    })
    test('Empty Email & Password show errors', async ({ app }) => {
        await app.signInForm.do.fillLoginData(users.invalidUsers[4].email, users.invalidUsers[4].password)
        await app.signInForm.check.verifyPasswordErrorVisible()
        await app.signInForm.check.verifyPasswordErrorVisible()

    })

})

