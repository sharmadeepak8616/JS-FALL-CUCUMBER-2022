const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect } = require("chai");
const HomePage = require("../../POM/Hotels/HomePage");

const homepage = new HomePage();

// Glue Code
/**
 * Glue code is a regular expression which helps to map Scenario-steps with functions (step-definitions)
 */
When(/^I change langugage to (.+)$/, async function (newLanguageOption) {
    await homepage.changeLanguage(newLanguageOption)
});

Then(/^I verify language got changed to (.+)$/, async function (expLanguage) {
    const languageOnWeb = await homepage.getLanguageFromWeb();
    expect(languageOnWeb, 'Language is not updated as expected').to.equal(expLanguage)
});

When(/^I select number of adults in (.+) as (.+)$/, async function (room, adultCount) {
    this.roomNum = room;
    await homepage.changeAdultCountInRoom(this.roomNum, adultCount)
});

Then(/^I verify the (minus|plus) button for adults is (disabled|enabled)$/, async function (btnName, expState) {
    const actualBtnState = await homepage.getBtnState(btnName, this.roomNum);
    switch (expState) {
        case 'disabled':
            expect(actualBtnState, `${btnName} button is not disabled`).to.equal('true');
            break;
        case 'enabled':
            expect(actualBtnState, `${btnName} button is not enabled`).to.be.null;
            break;
        default:
            break;
    }
});
/**
 * disabled button will have disabled-tag
 *  and value of disabled-tag is 'true'
 * 
 * enabled button will NOT have disabled-tag
 *  and value of disabled-tag is null
 */