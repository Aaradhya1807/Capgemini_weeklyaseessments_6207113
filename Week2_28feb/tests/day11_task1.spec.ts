import {test} from "@playwright/test";

test("task1", async ({page}) => {
    await page.goto("https://www.amazon.in/")
    // await page.goto("https://practicetestautomation.com/practice-test-login/")
    await page.locator("//input[@id='twotabsearchtextbox']").fill("shoes")
    await page.locator("//input[@id='nav-search-submit-button']").click()
    // await page.locator("//img[@class='s-image' and @src='https://m.media-amazon.com/images/I/71ju4kS-W8L._AC_UY218_.jpg']").click()   
    let name=await page.locator("//span[@class='a-truncate-cut']").nth(2).innerText()
    let price=await page.locator("//span[@class='a-price-whole']").first().innerText()
    console.log(name)
    console.log(price)


    await page.screenshot({path:"./screenshots/shoes.png"})
})

