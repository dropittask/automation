import { test, expect, Locator, Page } from '@playwright/test';

export class Home {
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly tabs: Locator;
  readonly header: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = this.page.locator('#password');
    this.tabs = this.page.locator('.header__inline-menu ul > li');
    this.header = this.page.locator('h1.header__heading');
    this.cartIcon = this.page.locator('#cart-icon-bubble');
    this.cartCount = this.page.locator('.cart-count-bubble > span:not(.visually-hidden)');
  }

  login = async (password: string): Promise<void> => {
    await test.step(`login to the app`, async() => {
      await this.page.goto('/password');
      await this.passwordInput.fill(password);
      await this.page.keyboard.press('Enter');
      await this.page.waitForLoadState('networkidle');
      await expect(this.header, 'did not find home page header!').toHaveText('drpt-external-dev');
    });
  };
  
  goToCatalog = async (): Promise<void> => {
    await test.step(`go to "Catalog" tab`, async() => {
      const tab = this.tabs.filter({ hasText: 'Catalog' });
      await tab.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.page, 'url does not contain /collections/all!').toHaveURL(/.*collections\/all/);
    });
  }
  
  viewCart = async (): Promise<void> => {
    await test.step(`click on the cart icon`, async() => {
      await this.cartIcon.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.page, 'url does not contain /cart!').toHaveURL(/.*cart/);
    });
  }
  
  validateCartCount = async (count: number): Promise<void> => {
    await test.step(`validate cart count is ${count}`, async() => {
      await this.cartCount.highlight();
      await expect(this.cartCount, `cart count is not ${count}!`).toHaveText(count.toString());
    });
  }
}