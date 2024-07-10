import { test } from '../custom_test';

test.describe.parallel('ui testing', async () => {
  test('positive test', async ({ home, catalog, cart }) => {
    const items = [
      {
        name: 'Dropit Hamburger (QA Automation)',
        instances: [
          {
            size: 'Medium',
            quantity: 2
          },
          {
            size: `So large you can't eat it`,
            quantity: 1
          }
        ]
      },
      {
        name: 'Dropit Chips (QA Automation)',
        instances: [
          {
            size: 'Large',
            quantity: 2
          },
          {
            size: `Too much for you to handle`,
            quantity: 1
          }
        ]
      }
    ]

    const checkoutDetails = {
      contact: {
        email: 'test@test.com'
      },
      delivery: {
        lastName: 'Gateway',
        address: 'Yehezkel Kaufmann 2',
        city: 'Tel Aviv'
      },
      card: {
        number: '1',
        expirationDate: '12/26',
        cvv: '777',
        cardOwnerName: 'Bogus Gateway'
      }
    }

    await home.login('giclao');
    await home.goToCatalog();
    await catalog.addItemsToCart(items);
    await home.viewCart();
    await home.validateCartCount(6);
    await cart.validateSubtotal('£33.00 GBP')

    await cart.goToCheckout();
    await cart.validateTotalAmount(56.99, 'GBP');
    await cart.fillContactDetails(checkoutDetails.contact);
    await cart.fillDeliveryDetails(checkoutDetails.delivery);
    await cart.fillCardDetails(checkoutDetails.card);
    await cart.clickPayNowButton();
    await cart.validateCheckoutSuccessful();
  });

  test('negative test', async ({ home, catalog, cart }) => {
    const items = [
      {
        name: 'Dropit Hamburger (QA Automation)',
        instances: [
          {
            size: `So large you can't eat it`,
            quantity: 1
          }
        ]
      },
      {
        name: 'Dropit Chips (QA Automation)',
        instances: [
          {
            size: `Too much for you to handle`,
            quantity: 1
          }
        ]
      }
    ]

    const checkoutDetails = {
      contact: {
        email: 'notavalidemail @test.com'
      },
      card: {
        number: 'a##a',
        expirationDate: '!7/0#',
        cvv: 'a#c',
        cardOwnerName: ''
      }
    }

    await home.login('giclao');
    await home.goToCatalog();
    await catalog.addItemsToCart(items);
    await home.viewCart();
    await home.validateCartCount(2);
    await cart.validateSubtotal('£13.00 GBP')

    await cart.goToCheckout();

    await cart.fillContactDetails(checkoutDetails.contact);
    await cart.fillCardDetails(checkoutDetails.card);
    await cart.clickPayNowButton();
    
    await cart.validateCheckoutFailed();

    await cart.validateErrorForEmail();
    await cart.validateErrorForCardNumber();
    await cart.validateErrorForCardExpiry();
    await cart.validateErrorForCVV();
    await cart.validateErrorForCardHolderName();
  });
  
});