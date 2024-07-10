import { test, expect, Locator, Page } from '@playwright/test';

export class Catalog {
  readonly page: Page;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly searchKeywordsOption: Locator;
  readonly searchResultsContainer: Locator;
  readonly searchResults: Locator;
  readonly searchResultsHeader: Locator;
  readonly productTitle: Locator;

  readonly sizeOptions: Locator;
  readonly quantityInputContainer: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchIcon = this.page.locator('.header__search');
    this.searchInput = this.page.locator('input#Search-In-Modal');
    this.searchKeywordsOption = this.page.locator('#predictive-search-option-search-keywords');
    this.searchResultsContainer = this.page.locator('#ProductGridContainer ul');
    this.searchResults = this.searchResultsContainer.locator('li');
    this.searchResultsHeader = this.page.getByText('Search results');
    this.productTitle = this.page.locator('.product__title');

    this.sizeOptions = this.page.locator('variant-radios > fieldset input ~ label');
    this.quantityInputContainer = this.page.locator('quantity-input');
    this.quantityInput = this.quantityInputContainer.locator('input.quantity__input');
    this.addToCartButton = this.page.getByText('Add to cart');
    this.cartNotification = this.page.locator('#cart-notification');
  }

  search = async (query: string): Promise<void> => {
    await test.step(`search for "${query}"`, async () => {
      await this.searchIcon.click();
      await this.searchInput.fill(query);
      await this.searchKeywordsOption.click();
      await this.page.waitForLoadState('networkidle');

      await expect(this.searchResultsHeader, 'search results header is not visible!').toBeVisible();
      await expect(await this.searchResults.count(), 'search query returned empty results!').toBeGreaterThanOrEqual(1);
    });
  };

  clickOnSearchResult = async (productName: string) => {
    await test.step(`click on search result "${productName}"`, async () => {
      await this.searchResults.filter({ hasText: productName }).click();
      await this.page.waitForLoadState('networkidle');
  
      await expect(this.productTitle, `search result page product title is not "${productName}"!`).toHaveText(productName);
    });
  };

  addItemsToCart = async (items: { name: string, instances: { size: string, quantity: number }[] }[]): Promise<void> => {
    for await (let item of items) {
      const { name, instances } = item;

      await this.search(name);
      await this.clickOnSearchResult(name);

      for await (let instance of instances) {
        const { size, quantity } = instance;

        await test.step(`select size ${size}`, async () => {
          await this.sizeOptions.filter({ hasText: size }).click();
        });

        await test.step(`select quantity ${quantity}`, async () => {
          await this.quantityInput.fill(quantity.toString())
        });

        await test.step(`click on "Add to cart"`, async () => {
          await this.addToCartButton.click();
          
          await expect(this.cartNotification, `cart notification is not visible after clicking "Add to cart"!`).toBeVisible();
          await expect(this.cartNotification, `cart notification does not contain the text "Item added to your cart"!`).toContainText('Item added to your cart');
        });
      }
    }
  };
}