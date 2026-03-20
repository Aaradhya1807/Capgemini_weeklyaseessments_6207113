import { test, expect } from "@playwright/test";
import Search from "../PageObjectModel/searchadd.page";

test("Search Product", async ({ page }) => {

    const search = new Search(page);

    await search.navigate();
    await search.search();
});