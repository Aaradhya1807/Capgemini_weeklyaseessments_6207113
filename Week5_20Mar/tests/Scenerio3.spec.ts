import { test } from "@playwright/test";
import SocialMedia from "../PageObjectModel/Socialmedia.page";

test("Verify all social media links", async ({ page, context }) => {

    const sm = new SocialMedia(page)

    await sm.navigate()

    await sm.checkAllSocials(context)

})