import {test} from "@playwright/test";

test("task1", async ({page}) => {
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1")
    await page.locator("//input[@id='name']").fill("Aaradhya")
    await page.locator("//input[@id='email']").fill("aaradhyamaharishi@gmail.com")
    await page.locator("//input[@id='password']").fill("Aaradhya@123")
    await page.locator("//button[@type='submit']").click()
    await page.locator("//input[@id='email']").fill("aaradhyamaharishi@gmail.com")
    await page.locator("//input[@id='password']").fill("Aaradhya@123")
    await page.locator("//button[@type='submit']").click()




    await page.screenshot({path:"./screenshots/userlogin.png"})
})

