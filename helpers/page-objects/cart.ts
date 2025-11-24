import { Page,expect } from '@playwright/test';
// @author: Thu Nguyen
export class Cart{

    private readonly ctHome;
    private readonly ctProduct;
    private readonly ctViewCart;
    private readonly ctUpdateCart;
    private readonly ctTotal;
    private readonly ctCart;

    /** Constructor for the class Cart  
     * page: Page object
    */
    constructor(public readonly page: Page) {
        
        this.ctHome = this.page.getByText("Home"),
        this.ctProduct = "[text()='{replaceText}']";        
        this.ctViewCart = this.page.getByTitle("View cart");   
        this.ctUpdateCart = this.page.getByRole("button",{name: 'Update cart'});  
        this.ctTotal = this.page.locator('[data-title="Total"]');
        this.ctCart = this.page.locator('header').getByRole('heading',{name: 'Cart'});
     }

    /**
     * Verify if the Cart is shown
      */
    async verifyCart(){
        await expect(this.ctCart).toBeVisible();
    }

    /* Update  the Cart */
    async updateCart(){
        await this.ctUpdateCart.click();
        
    }
    
    /** Input the quantity of the product
     * @param product The product name
     * @param quantity The quantity of the product
       */
    async inputQuantityOfProduct(product: string, quantity: number){
        let ctProductName = await this.page.getByText(product);
        let ctTd = await this.page.locator('.product-name').filter({ has: ctProductName });
        let ctTr = await this.page.locator('tr').filter({has : ctTd});
        let ctQuantity = await ctTr.locator('[aria-label="Product quantity"]');
        await ctQuantity.fill(quantity.toString());
        await ctQuantity.press('End');
        
    }

    /** Verify the total amount
     *  @param amount Amount*/
    async verifyTotalAmount(amount: number){

        await expect(await this.ctTotal.getByText(amount.toString())).toBeVisible();
    }

    /** Verify if the quantity value is shown in the input box 
     * @param product Product name
    */
    async verifyInput(product: string, quantity: number){
        let productName = await this.page.getByText(product);
        let td = await this.page.locator('.product-name').filter({ has: productName });
        let tr = await this.page.locator('tr').filter({has : td});
        await expect(tr.locator('[aria-label="Product quantity"]')).toHaveValue(quantity.toString());
    }
}