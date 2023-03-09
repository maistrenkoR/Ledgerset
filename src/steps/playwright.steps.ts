import { ICustomWorld } from "../support/custom-world";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import words from "random-words";
import { LoginPage } from "../pageObjects/loginPage";
import { PostalServicePage } from "../pageObjects/postalServicePage";
import { CreateMailPage } from "../pageObjects/createMailPage";
import { IEmailData } from "../models/emailData";

Given("I log in", async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page!);
  loginPage.goto();
  await loginPage.login();
});

Given("I navigate to Postal Service page", async function (this: ICustomWorld) {
  const postalServicePage = new PostalServicePage(this.page!);
  postalServicePage.waitForMenuTitle();
});

Then(
  "I see avaliable options {string}",
  async function (this: ICustomWorld, options: string) {
    const postalServicePage = new PostalServicePage(this.page!);
    const optionsList: string[] = await postalServicePage.getOptionListText();
    const optionsListToString = optionsList.join(", ");
    expect(optionsListToString).toEqual(options);
  }
);

When(
  "I click on the {string} link",
  async function (this: ICustomWorld, tab: string) {
    const postalServicePage = new PostalServicePage(this.page!);
    await postalServicePage.clickOnMenuItem(tab);
  }
);

Then(
  "I see {string} page",
  async function name(this: ICustomWorld, tab: string) {
    const postalServicePage = new PostalServicePage(this.page!);
    await postalServicePage.isMenuItemActive(tab);
  }
);

When(
  "I fill all required information for the letter",
  async function (this: ICustomWorld) {
    const createMailPage = new CreateMailPage(this.page!);
    const emailInfo: IEmailData = {
      toWhom: `rmaistrenko.job+task1@gmail.com`,
      topic: words(1).toString(),
      text: words(10).join(", "),
    };
    createMailPage.fillEmailInfo(emailInfo);
  }
);

When("I click on 'Надіслати'", async function (this: ICustomWorld) {
  const createMailPage = new CreateMailPage(this.page!);
  createMailPage.clickOnSendMessageButton();
});

Then("Email sent", async function (this: ICustomWorld) {
  const postalServicePage = new PostalServicePage(this.page!);
  const confirmText: string =
    await postalServicePage.getTextFromConfirmationBlock();
  expect(confirmText).toEqual("Лист успішно відправлено адресатам");
});
