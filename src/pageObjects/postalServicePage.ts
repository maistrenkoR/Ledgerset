import { Locator, Page } from "@playwright/test";

export class PostalServicePage {
  readonly page: Page;
  readonly menuTitle: Locator;
  readonly menu: Locator;
  readonly confirmationBlock: Locator;

  private menuItem = (tab: string) => `.sn_menu_item a:text-is("${tab}")`;

  constructor(page: Page) {
    this.page = page;
    this.menuTitle = page.locator(".sn_menu_title");
    this.menu = page.locator(".list_underlined");
    this.confirmationBlock = page.locator(".block_confirmation");
  }

  async waitForMenuTitle(): Promise<void> {
    await this.menuTitle.waitFor({ state: "visible" });
  }

  async getOptionListText(): Promise<string[]> {
    const menuText: string | null = await this.menu.textContent();
    const menuTextWithoutNums: string = menuText!.replace(/[0-9]/g, "").trim();
    const optionsList: string[] = menuTextWithoutNums.split("\n");
    return optionsList;
  }

  async clickOnMenuItem(tab: string): Promise<void> {
    await this.page.click(this.menuItem(tab));
  }

  async isMenuItemActive(tab: string): Promise<void> {
    await this.page.locator(this.menuItem(tab)).waitFor({ state: "visible" });
  }

  async getTextFromConfirmationBlock(): Promise<string> {
    const confirmText: string = await this.confirmationBlock.innerText({
      timeout: 60000,
    });
    return confirmText;
  }
}
