import { test, expect } from '@playwright/test';
import {Home} from '../helpers/page-objects/home';
import {Cart} from '../helpers/page-objects/cart'


test('Add a product to Cart', async ({ page }) => {
  let home = new Home(page);
  let cart = new Cart(page);
  let product = 'Album';
  await test.step('Open the page',async() => {
    await page.goto('/');
    // Verify the Shop title
    await home.verifyShopTitle();
    // Verify if the cart is empty
    await home.verifyCart(0);
  })
  await test.step('Select a product',async() => {
   
    await home.addToCart(product);
    await home.verifyCart(1);
  })
  await test.step('View the cart',async() => {
   
    await home.goToCart(product);
    await cart.verifyInput(product,1);
  })

  await test.step('Increase the number of the product',async() => {
   
    await cart.inputQuantityOfProduct(product,2);
    await cart.verifyInput(product,2);
  })

  await test.step('Update cart',async() => {
   
    await cart.updateCart();
    await cart.verifyTotalAmount(30);
  })
});


