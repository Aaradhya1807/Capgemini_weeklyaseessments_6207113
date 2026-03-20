import { Page, expect } from '@playwright/test';
import path from "path";
import search from "../Utility/search.json";
class Search{
    page:Page
    data:any
    searchbar:any
    searchBTN:any
    product:any
    sizebar:any
    colorbar:any
    addtocart:any
    constructor(page:Page){
        this.page=page;
        this.data=search;
        this.searchbar=page.locator('//input[@class="search"]')
        this.searchBTN=page.locator('//input[@id="search-submit"]')
        this.product=page.locator('//img[@src="//sauce-demo.myshopify.com/cdn/shop/products/jacket_large.jpg?v=1394657254"]')
        this.sizebar=page.locator('//select[@class="single-option-selector"]').first()
        this.colorbar=page.locator('//select[@class="single-option-selector"]').last()
        this.addtocart=page.locator('//input[@value="Add to Cart"]')

    }
    async navigate(){
        await this.page.goto(this.data.url)
    }

    async search(){
        await this.searchbar.fill(this.data.name)
        await this.searchBTN.click()
        await this.product.click()
        await this.sizebar.selectOption({ label: "M" });
        await this.colorbar.selectOption({ label: "Blue" });
        await this.addtocart.click()
        // await this.page.waitForTimeout(3000)
    }

}
export default Search;