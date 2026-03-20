import { test } from "@playwright/test";
import Search from "../PageObjectModel/searchadd.page";
import Checkout from "../PageObjectModel/checkout.page";

test("Shopify", async ({ page }) => {

    const obj = new Search(page);

    await obj.navigate();
    await obj.search();

    const obj1= new Checkout(page)
    await obj1.checkout()


    // const obj2=new ADDP(page)
    // await obj2.navigate()
    // await obj2.addtoc()

});