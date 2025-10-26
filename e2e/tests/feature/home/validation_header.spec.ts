import { test } from '../../../fixture'

test.describe('Header UI behavior', () => {
    // let homePage: HomePage;
    // let garagePage: GaragePage;


    test.beforeEach(async ({ app }) => {
        await app.homePage.open()
        await app.homePage.expectLoaded()


    })


    test('Validates header elements, navigation actions, and section visibility on Home page', async ({ app }) => {
        await test.step('Validate all header elements are visible', async () => {
            await app.homePage.check.verifyPageHeader()

        });
        await test.step('1: Verify "Home" button is active', async () => {
            await app.homePage.check.verifyHomeButtonIsActive()
        })

        await test.step('2: Click "About" and verify scroll to About section', async () => {
            await app.homePage.do.clickAboutAndScrollToSection()
            await app.homePage.check.verifyAboutButtonScrollsToSection()
        });

        await test.step('3: Click "Contacts" and verify scroll to Contacts section', async () => {
            await app.homePage.do.clickContactsButtonAndScrollToSection()
            await app.homePage.check.verifyContactsButtonScrollsToSection()
        });
        await test.step('4: Verify "Sign In" button is enabled ', async () => {
            await app.homePage.check.verifySignInButtonVisibleAndEnabled()
        })

        await test.step('5: Click "Guest log in" and verify navigation to Garage page', async () => {
            await app.homePage.do.clickGuestLoginButtonRedirectToGuestPage()
            await app.garagePage.check.verifyGaragePageLoaded()


        })


    });

})
