import { test, expect } from "@playwright/test";
import Login from "../PageObjectModel/LogIn.page";

test("Login Validation", async ({ page }) => {

    const login = new Login(page);

    await login.navigate();
    await login.login();

});