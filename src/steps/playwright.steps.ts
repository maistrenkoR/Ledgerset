import { ICustomWorld } from "../support/custom-world";
import { Given, Then, When } from "@cucumber/cucumber";
import { config } from "../support/config";
import { expect } from "@playwright/test";
import words from "random-words";

Given("I log in", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await page.locator(".Left .logo_container").waitFor();
  await page.type('[name="login"]', config.BASE_LOGIN);
  await page.type('[name="pass"]', config.BASE_PASSWORD);
  await page.click('[name="lform"] [type="submit"]');
});

Given("I navigate to Postal Service page", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator(".sn_menu_title").waitFor({ state: "visible" });
});

Then(
  "I see avaliable options {string}",
  async function (this: ICustomWorld, options: string) {
    const page = this.page!;
    const optionsList: string[] = await page
      .locator(".list_underlined a")
      .allInnerTexts();
    const optionsListToString = optionsList
      .map((option) => (option.includes("\n") ? option.split("\n")[1] : option))
      .join(", ");
    expect(options).toEqual(optionsListToString);
  }
);

When(
  "I click on the {string} link",
  async function (this: ICustomWorld, tab: string) {
    const page = this.page!;
    await page.locator(`.sn_menu_item a:text-is("${tab}")`).click();
  }
);

Then(
  "I see {string} page",
  async function name(this: ICustomWorld, tab: string) {
    const page = this.page!;
    await page
      .locator(`._current a:text-is("${tab}")`)
      .waitFor({ state: "visible" });
  }
);

When(
  "I fill all required information for the letter",
  async function (this: ICustomWorld) {
    const email: string = `rmaistrenko.job+task1@gmail.com`;
    const page = this.page!;
    await page.locator("#to").type(email);
    await page.locator('[name="subject"]').type(words(1).toString());
    await page.locator("#text").type(words(10).join(", "));
  }
);

When("I click on 'Надіслати'", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('.send_container [name="send"]').first().click();
});

Then("Email sent", async function (this: ICustomWorld) {
  const page = this.page!;
  const confirmText: string = await page
    .locator(".block_confirmation")
    .innerText();
  expect(confirmText).toEqual("Лист успішно відправлено адресатам");
});
