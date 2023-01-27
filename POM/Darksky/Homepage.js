const Commands = require("../Commands");

class Homepage {

    timeMachineBtnLocator = '//div[@id="timeMachine"]//a';
    highlightedDateLocator = '//td[@class="is-today"]//button';

    commands = new Commands();

    async scrollAndClickTimeMachineBtn() {
        await this.commands.scrollToElement(this.timeMachineBtnLocator);
        await this.commands.clickWebElement(this.timeMachineBtnLocator);
    }

    async getHighlightedDate() {
        return await this.commands.getTextOfWebElement(this.highlightedDateLocator); 
    }




}
module.exports = Homepage;