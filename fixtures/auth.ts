import {test as base, type Page, type BrowserContext} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'
import { env } from 'node:process';

type AuthFixtures={
    loginTab:Page;
    loginPage:LoginPage
    authenticatedContext:BrowserContext;
};

export const test=base.extend<AuthFixtures>({
    loginTab:async({context}, use)=>{
        const tab=await context.newPage();
        await use(tab);
    },

loginPage: async ({ loginTab }, use) => {
  await use(new LoginPage(loginTab));
},

authenticatedContext: async ({context, loginTab, loginPage}, use)=>{
    const userName=process.env.DEMO_USERNAME;
    const password =process.env.DEMO_PASSWORD;

    if(!userName || !password){
        throw new Error("Username or password is incorrect");

    }
await loginPage.goto();
await loginPage.login(userName,password);
await loginTab.waitForURL(/\/secure\/?$/);
await use(context);


}
});
export{expect} from '@playwright/test'

