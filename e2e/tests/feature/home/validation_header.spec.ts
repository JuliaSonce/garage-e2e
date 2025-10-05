import { test, expect } from '@playwright/test'
import HomePage from '../../../page_objects/home_page/HomePage';
import GaragePage from '../../../page_objects/garage_page/GaragePage'


test.describe('Header UI behavior', async () => {
    let homePage: HomePage;
    let garagePage: GaragePage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        garagePage = new GaragePage(page);
        await homePage.open()
        await homePage.expectLoaded()


    })



    test('Validates header elements, navigation actions, and section visibility on Home page', async () => {
        await test.step('Validate all header elements are visible', async () => {
            await homePage.check.verifyPageHeader()

        });
        await test.step('1: Verify "Home" button is active', async () => {
            await homePage.check.verifyHomeButtonIsActive()
        })

        await test.step('2: Click "About" and verify scroll to About section', async () => {
            await homePage.do.clickAboutAndScrollToSection()
            await homePage.check.verifyAboutButtonScrollsToSection()
        });

        await test.step('3: Click "Contacts" and verify scroll to Contacts section', async () => {
            await homePage.do.clickContactsButtonAndScrollToSection()
            await homePage.check.verifyContactsButtonScrollsToSection()
        });
        await test.step('4: Verify "Sign In" button is enabled ', async () => {
            await homePage.check.verifySignInButtonVisibleAndEnabled()
        })

        await test.step('5: Click "Guest log in" and verify navigation to Garage page', async () => {
            await homePage.do.clickGuestLoginButtonRedirectToGuestPage()
            await garagePage.check.verifyGaragePageLoaded()


        })


    });

})
