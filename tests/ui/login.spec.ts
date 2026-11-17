import { env } from 'node:process'
import { expect, test } from '../../fixtures/auth';
import { LoginPage } from '../../pages/LoginPage';

test('login with valid credentials', async ({ loginTab, loginPage }) => {
    const username = env.DEMO_USERNAME;
    const password = env.DEMO_PASSWORD;

    if (!username || !password) {
        throw new Error('Set DEMO_USERNAME and DEMO_PASSWORD in .env');
    }

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(loginTab).toHaveURL(/\/secure\/?$/);
    await expect(loginTab.getByRole('heading', { level: 1 })).toHaveText('Secure Area page for Automation Testing Practice');
});

test('login with invalid credentials', async ({ loginTab, loginPage}) => {
    const username = "hello";
    const password = "hello";

    await loginPage.goto();
    await expect(loginTab).toHaveURL(/\/login\/?$/);
    await loginPage.login("error",password);

    await expect(loginTab.getByRole('alert')).toContainText('Your username is invalid!');

})