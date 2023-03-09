import { Locator, Page } from "@playwright/test";
import { IEmailData } from "../models/emailData";

export class CreateMailPage {
  readonly page: Page;
  readonly toWhomInput: Locator;
  readonly topicInput: Locator;
  readonly textInput: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toWhomInput = page.locator("#to");
    this.topicInput = page.locator('[name="subject"]');
    this.textInput = page.locator("#text");
    this.sendMessageButton = page.locator('.send_container.clear [name="send"]');
  }

  async fillEmailInfo(emailInfo: IEmailData) {
    await this.toWhomInput.type(emailInfo.toWhom);
    await this.topicInput.type(emailInfo.topic);
    await this.textInput.type(emailInfo.text);
  }

  async clickOnSendMessageButton() {
    await this.sendMessageButton.waitFor({state: "visible"});
    await this.sendMessageButton.click();
  }
}
