import type { Locator, Page } from '@playwright/test'

export class LoginPage {

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;


    constructor(private readonly page: Page) {

        this.usernameInput = page.getByLabel("Username", { exact: true });
        this.passwordInput = page.getByLabel("Password", { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true })


    }

    async goto() {
        await this.page.goto('/login');

    }

    async login(userName: string, password: string) {
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

    }

}