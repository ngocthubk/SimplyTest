import { Page, expect } from '@playwright/test';
// @author: Thu Nguyen
export class Home{

    private readonly ctHome;
    private readonly ctAddToCart;
    private readonly ctViewCart;
    private readonly ctShopTitle;
    private readonly ctViewYourCart;

    /** Constructor for the class Cart  
     * page: Page object
    */
    constructor(public readonly page: Page) {
        this.ctShopTitle = this.page.getByRole('heading',{name: 'Shop'})
        this.ctHome = this.page.getByText("Home"),
        this.ctAddToCart = '[aria-label=\'Add to cart: “{replaceText}”\']';
        this.ctViewCart = this.page.getByTitle("View cart");       
        this.ctViewYourCart = this.page.getByTitle('View your shopping cart').locator('.count');
     }
    /**
     * Add a product to a cart
     * @param product: Product name
      */
    async addToCart(product: string){
        
        await this.page.locator(this.ctAddToCart.replace("{replaceText}",product)).click();
    }

    /**
     * Go to the cart by clicking on the button 'View cart' under a product
     * @param product: Product name
      */
    async goToCart(product: string){
        let addToCart = await this.page.locator(this.ctAddToCart.replace("{replaceText}",product))
        let parent = await this.page.getByRole("listitem").filter({ has: addToCart })
        await parent.getByTitle("View cart").click();
    }

    /**
     * Verify the shop title
      */
    async verifyShopTitle(){
        await expect(this.ctShopTitle).toBeVisible();
        
    }
    
    /** Verify the total quantity of all products on the right up corner of the home page
     * @param quantity: The total number of products in the cart
     */
    async verifyCart(quantity: number){
        if (quantity == 1)
            await expect(this.ctViewYourCart).toHaveText(quantity+' item');
        else
            await expect(this.ctViewYourCart).toHaveText(quantity+' items');
    }
}