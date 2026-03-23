import { Page, Locator } from "@playwright/test";
import social from "../Utility/Social.json";

class SocialMedia {

    page: Page
    data: any
    facebook: Locator
    twitter: Locator
    instagram: Locator
    pinterest: Locator

    constructor(page: Page) {
        this.page = page
        this.data = social

        this.facebook = page.locator('//a[@href="http://www.facebook.com/shopify"]')
        this.twitter = page.locator('//a[@href="http://www.twitter.com/sauce_io"]')
        this.instagram = page.locator('//a[@href="http://www.instagram.com/shopify"]')
        this.pinterest = page.locator('//a[@href="http://www.pinterest.com/chrisjhoughton/awesome-facebook-integration/"]')
    }

    async navigate() {
        await this.page.goto(this.data.url)
    }

    async openAndValidate(
        context: any,
        locator: Locator,
        name: string
    ) {

        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            locator.click()
        ])

        await newPage.waitForLoadState()
        await newPage.screenshot({ path: `./screenshots/${name}.png` })

        await newPage.close()
    }

    async checkAllSocials(context: any) {

        await this.openAndValidate(context, this.facebook, "Facebook")

        await this.openAndValidate(context, this.twitter, "Twitter")

        await this.openAndValidate(context, this.instagram, "Instagram")

        await this.openAndValidate(context, this.pinterest, "Pinterest")

    }

}

export default SocialMedia;