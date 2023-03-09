import { Locator, Page } from "@playwright/test";
import { config } from "../support/config";

export class LoginPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator('[name="login"]');
    this.passwordInput = page.locator('[name="pass"]');
    this.loginButton = page.locator('[name="lform"] [type="submit"]');
  }

  async goto() {
    await this.page.goto(config.BASE_URL);
  }

  async login() {
    await this.loginInput.type(config.BASE_LOGIN);
    await this.passwordInput.type(config.BASE_PASSWORD);
    await this.loginButton.click();
  }
}
