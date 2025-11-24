import { test, expect } from '@playwright/test';
import {Home} from '../helpers/page-objects/home';
import {Cart} from '../helpers/page-objects/cart'
import { afterEach } from 'node:test';

test.describe('Go Shopping',()=> {
    [       
    {product: 'Album'},
    ].forEach(({product}) => {
test(`Add a product ${product} to Cart`, async ({ page }) => {
  let home = new Home(page);
  let cart = new Cart(page);

  await test.step('Open the page',async() => {
    await page.goto('/');
    // Verify the Shop title
    await home.verifyShopTitle();
    // Verify if the cart is empty
    await home.verifyQuantityOfItemInCart(0);
  })

  await test.step('Select a product',async() => {   
    await home.addToCart(product);
    await home.verifyQuantityOfItemInCart(1);
  })

  await test.step('View the cart',async() => {
    await home.goToCart(product);
    await cart.verifyQuantity(product,1);
  })

  await test.step('Increase the number of the product',async() => {   
    await cart.inputQuantityOfProduct(product,2);
    await cart.verifyQuantity(product,2);
  })

  await test.step('Update cart',async() => {   
    await cart.updateCart();
    await cart.verifyTotalAmount(30);
  })
});

test.afterEach(async ({ page }) => {

      await page.close();
    })
})
})

