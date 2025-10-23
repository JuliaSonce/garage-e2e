
import { generateUser } from 'e2e/utils/user_generator';
import { test } from '../../../fixture'
import SignUpForm from 'e2e/app/components/signUpForm.components';



test.describe("Validation Registration Form", () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ app }) => {

        //let signUpForm: SignUpForm;
        await app.homePage.open()
        await app.homePage.expectLoaded()
        await app.homePage.do.clickSignUpButton()
        signUpForm = new SignUpForm(app.page, app.homePage.locators.registrationModal)
        await signUpForm.check.verifyRegisterFormVisible()
    })
    test('Validates  visibility and functionality of elements, navigation actions in  "Sign Up" Form', async ({ app: { garagePage, signUpForm, homePage } }) => {
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
            await garagePage.check.verifyGaragePageLoaded()
        })

    })
})