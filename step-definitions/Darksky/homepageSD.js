const { When } = require("@wdio/cucumber-framework");
const { expect } = require("chai");
const Homepage = require("../../POM/Darksky/Homepage");
const Dates = require("../../Utils/Dates");

const homepage = new Homepage();

When(/^I click on Time Machine button$/, async function () {
    await homepage.scrollAndClickTimeMachineBtn();
});

When(/^I verify current date is highlighted$/, async function () {
    const highlightedDate = await homepage.getHighlightedDate();
    const currentDate = Dates.getCurrentDate();
    expect(highlightedDate, `Current date is not highlighted`).to.equal(currentDate);
});