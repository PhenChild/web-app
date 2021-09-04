import { Before, Given, Then, When } from "cucumber";
import { expect } from "chai";

import { ViewerPage } from "../pages/viewer.po";

let page: ViewerPage;

Before(() => {
    page = new ViewerPage();
});

Given(/^I am on the register page$/, async () => {
    await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see the tables with registers$/, async () => {
    expect(await page.getTable()).to.contain("EST");
});

Given(/^I am on the chart page$/, async () => {
    await page.navigateToChart();
});

Then(/^I should see the form$/, async () => {
    expect(await page.getForm()).to.contain("Estación");
});

