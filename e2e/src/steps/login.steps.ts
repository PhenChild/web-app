import { Before, Given, Then, When } from "cucumber";
import { expect } from "chai";

import { LoginPage } from "../pages/login.po";

let page: LoginPage;

Before(() => {
    page = new LoginPage();
});

Given(/^I am on the login Page$/, async () => {
    await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see a welcome message$/, async () => {
    expect(await page.getTitleText()).to.equal("Bienvenido!");
});
