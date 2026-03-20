import { test } from "@playwright/test";
import Signup from "../PageObjectModel/SignUp.page";
import Login from "../PageObjectModel/LogIn.page";
import ADDP from "../PageObjectModel/addtocart.page";

test("Shopify", async ({ page }) => {

    const obj = new Signup(page);

    await obj.navigate();
    await obj.signup();

    const obj1= new Login(page)
    await obj1.navigate()
    await obj1.login()


    const obj2=new ADDP(page)
    await obj2.navigate()
    await obj2.addtoc()

});