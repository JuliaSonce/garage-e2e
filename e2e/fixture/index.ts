import { test as pwTest } from '@playwright/test';
import { Application } from '../app';


export const test = pwTest.extend<{
    app: Application;
    // openRegistrationModal: void;
}>({
    app: async ({ page }, use) => {
        const application = new Application(page);
        await use(application);
    },

    // openRegistrationModal: async ({ app }, use) => {
    //     await app.homePage.do.openRegistrationModal();
    //     await use();
    // },
    //await use({ user, createdUser,userInfo, useHedlessLogin})

});

