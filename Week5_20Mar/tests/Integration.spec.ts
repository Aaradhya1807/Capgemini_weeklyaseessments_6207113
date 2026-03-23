import { test } from "@playwright/test";
import Signup from "../PageObjectModel/SignUp.page";
import Login from "../PageObjectModel/LogIn.page";
import ADDP from "../PageObjectModel/addtocart.page";
import Search from "../PageObjectModel/searchadd.page";
import Checkout from "../PageObjectModel/checkout.page";

test("Complete Shopify Flow", async ({ page }) => {

    // Signup
    const signup = new Signup(page);
    await signup.navigate();
    await signup.signup();

    //  Login
    const login = new Login(page);
    await login.navigate();
    await login.login();

    //  Add to cart (direct product)
    const add = new ADDP(page);
    await add.navigate();
    await add.addtoc();

    //  Search + Add to cart
    const search = new Search(page);
    await search.navigate();
    await search.search();

    //  Checkout
    const checkout = new Checkout(page);
    await checkout.checkout();

});