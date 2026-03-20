import { Page, expect } from '@playwright/test';
import path from "path";
import addtocart from "../Utility/addtocart.json";
class ADDP{
    page:Page
    data:any
    homeBTN:any
    productclick:any
    Productname:any
    Productprice:any
    addtocart:any
    constructor(page:Page){
        this.page=page;
        this.data=addtocart;
        this.homeBTN=page.locator('//a[@href="/" and .="Home"]').first()
        this.productclick=page.locator('//img[@src="//sauce-demo.myshopify.com/cdn/shop/products/fleece_large.jpg?v=1394656989"]')
        this.Productname=page.locator('//h1[@itemprop="name"]')
        this.Productprice=page.locator('//span[@class="product-price"]')
        this.addtocart=page.locator('//input[@value="Add to Cart"]')

    }
    async navigate(){
        await this.page.goto(this.data.url)
    }

    async addtoc(){
        await this.homeBTN.click()
        await this.productclick.click()
        let name=await this.Productname.allTextContents()

        console.log(name);

        let price=await this.Productprice.allTextContents()
        console.log(price);
        
        
        await this.addtocart.click()
    }

}
export default ADDP;