import { test, expect, Locator, Page } from '@playwright/test';

export class Cart {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly totalAmount: Locator;
  readonly payNowButton: Locator;
  readonly emailInput: Locator;
  readonly lastNameInput: Locator;
  readonly cityInput: Locator;
  readonly addressInput: Locator;
  readonly numberInput: Locator;
  readonly expirationInput: Locator;
  readonly cvvInput: Locator;
  readonly cardOwnerInput: Locator;
  readonly checkoutHeader: Locator;
  readonly errorForEmail: Locator;
  readonly errorForCardNumber: Locator;
  readonly errorForCardExpiry: Locator;
  readonly errorForCVV: Locator;
  readonly errorForCardHolderName: Locator;
  readonly subtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.locator('#checkout');
    this.totalAmount = this.page.locator('div[role=row]').last().locator('div[role=cell]');
    this.payNowButton = this.page.locator('#checkout-pay-button');
    this.emailInput = this.page.getByPlaceholder('Email or mobile phone number');
    this.lastNameInput = this.page.getByPlaceholder('Last name');
    this.cityInput = this.page.getByPlaceholder('City');
    this.addressInput = this.page.getByPlaceholder('Address');
    this.numberInput = this.page.frameLocator('iframe[title="Field container for: Card number"]').locator('input#number');
    this.expirationInput = this.page.frameLocator('iframe[title="Field container for: Expiration date (MM / YY)"]').locator('input#expiry');
    this.cvvInput = this.page.frameLocator('iframe[title="Field container for: Security code"]').locator('input#verification_value');
    this.cardOwnerInput = this.page.frameLocator('iframe[title="Field container for: Name on card"]').locator('input#name');
    this.checkoutHeader = this.page.locator('#checkout-main header');
    this.errorForEmail = this.page.locator('#error-for-email')
    this.errorForCardNumber = this.page.locator('#error-for-number')
    this.errorForCardExpiry = this.page.locator('#error-for-expiry')
    this.errorForCVV = this.page.locator('#error-for-verification_value')
    this.errorForCardHolderName = this.page.locator('#error-for-name')
    this.subtotal = this.page.locator('.totals__subtotal-value')
  }
  
  goToCheckout = async (): Promise<void> => {
    await test.step(`click on checkout button`, async() => {
      await this.checkoutButton.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.page, 'url does not contain /checkouts!').toHaveURL(/.*checkouts.*/);
  });
  }
  
  fillContactDetails = async (data: { email: string }) => {
    await test.step(`fill contact details`, async() => {
      await this.emailInput.fill(data.email);
    });
  }
  
  fillDeliveryDetails = async (data: {
    lastName: string,
    address: string,
    city: string
  }): Promise<void> => {
    await test.step(`fill delivery details`, async() => {
      await this.lastNameInput.fill(data.lastName);
      await this.addressInput.fill(data.address);
      await this.cityInput.fill(data.city);
    });
  }
  
  fillCardDetails = async (details: {
    number: string,
    expirationDate: string,
    cvv: string,
    cardOwnerName: string
  }): Promise<void> => {
    await test.step(`fill card details`, async() => {
      await this.numberInput.fill(details.number);
      await this.expirationInput.fill(details.expirationDate);
      await this.cvvInput.fill(details.cvv);
      await this.cardOwnerInput.fill(details.cardOwnerName);
    });
  }
  
  clickPayNowButton = async (): Promise<void> => {
    await test.step(`click on "Pay now" button`, async() => {
      await this.payNowButton.click();
    });
  }
  
  validateTotalAmount = async (amount: number, currency: string): Promise<void> => {
    const currencyElement = this.totalAmount.locator('abbr');
    const amountElement = this.totalAmount.locator('strong');
    
    await expect(amountElement, `amount is not ${amount}!`).toContainText(amount.toString());
    await expect(currencyElement, `currency is not ${currency}!`).toHaveText(currency);
  }

  validateCheckoutSuccessful = async (): Promise<void> => {
    await test.step(`validate checkout sucessful`, async() => {
      await expect(this.checkoutHeader, `check out header does not contain "Thank you!" after checkout!`).toContainText('Thank you!')
    });
  }

  validateCheckoutFailed = async (): Promise<void> => {
    await test.step(`validate checkout failed`, async() => {
      await expect(this.checkoutHeader, `checkout header is visible after checkout!`).not.toBeVisible();
    });
  }

  validateErrorForEmail = async (): Promise<void> => {
    await test.step(`validate email error`, async() => {
      await this.validateInputError(this.errorForEmail, 'Enter a valid email');
    });
  }

  validateErrorForCardNumber = async (): Promise<void> => {
    await test.step(`validate card number error`, async() => {
      await this.validateInputError(this.errorForCardNumber, 'Enter a card number');
    });
  }

  validateErrorForCardExpiry = async (): Promise<void> => {
    await test.step(`validate card expiry error`, async() => {
      await this.validateInputError(this.errorForCardExpiry, 'Enter a valid expiration date');
    });
  }

  validateErrorForCVV = async (): Promise<void> => {
    await test.step(`validate CVV error`, async() => {
      await this.validateInputError(this.errorForCVV, 'Enter the CVV or security code on your card');
    });
  }

  validateErrorForCardHolderName = async (): Promise<void> => {
    await test.step(`validate card holder name error`, async() => {
      await this.validateInputError(this.errorForCardHolderName, 'Enter your name exactly as it’s written on your card');
    });
  }

  validateSubtotal = async (expected: string): Promise<void> => {
    await test.step(`validate subtotal text`, async() => {
      await expect(this.subtotal).toHaveText(expected);
    });
  }

  private validateInputError = async (errorLocator: Locator, expectedErrorText: string): Promise<void> => {
    const expectedErrorColor = 'rgb(221, 29, 29)';
    await expect(errorLocator, `error text color is not "${expectedErrorText}"!`).toHaveCSS('color', expectedErrorColor);
    await expect(errorLocator, `error text is not "${expectedErrorText}"!`).toContainText(expectedErrorText);
  };
}