import { Page, expect } from '@playwright/test';
import path from "path";
import checkout from "../Utility/checkout.json";
class Checkout{
    page:Page
    data:any
    checkoutBTN1:any
    checkoutBTN2:any
    Email:any
    Lname:any
    Adress:any
    cardno:any
    expdate:any
    seccode:any
    nameoncard:any
    pay:any

    constructor(page:Page){
        this.page=page;
        this.data=checkout
        this.checkoutBTN1=page.locator('//a[@class="checkout" and .="Check Out"]')
        this.checkoutBTN2=page.locator('//input[@value="Check Out"]').last()
        this.Email=page.locator('//input[@placeholder="Email"]')
        this.Lname=page.locator('//input[@placeholder="Last name"]')
        this.Adress=page.locator('//input[@placeholder="Address"]')
        this.cardno=page.locator('//input[@placeholder="Card number"]')
        this.expdate=page.locator('//input[@placeholder="Expiration date (MM / YY)"]')
        this.seccode=page.locator('//input[@placeholder="Security code"]')
        this.nameoncard=page.locator('//input[@placeholder="Name on card"]')
        this.pay=page.locator('//button[@id="checkout-pay-button"]')

    }
    async navigate(){
        await this.page.goto(this.data.url)
    }

    async checkout(){
        await this.checkoutBTN1.click()
        await this.checkoutBTN2.click()
        await this.Email.fill(this.data.Email)
        await this.Lname.fill(this.data.Lname)
        await this.Adress.fill("265/31");
        await this.page.locator('text=265/31, Sector 26, Pratap Nagar').click();
        await this.page
  .frameLocator('iframe[name*="card-fields-number"]')
  .getByPlaceholder("Card number")
  .fill(this.data.cardno);


        await this.page.frameLocator('iframe[name*="card-fields-expiry"]')
  .getByPlaceholder("Expiration date (MM / YY)")
  .fill(this.data.expdate);
        
        await this.page.frameLocator('iframe[name*="card-fields-verification_value"]')
  .getByPlaceholder("Security code")
  .fill(this.data.seccode);

        await this.page
  .frameLocator('iframe[name*="card-fields-name"]')
  .getByPlaceholder("Name on card")
  .fill(this.data.nameoncard);


        await this.pay.click()
        // await this.page.waitForTimeout(3000)
    }

}
export default Checkout;