const Commands = require('../Commands');

class HomePage {

    commands = new Commands();

    // Locators for web-Elements on the HomePage (variables)

    // Language related Locator
    languageLocator = '//button[@data-stid]//div[contains(@class, "uitk-text-default-theme")]';
    languageDropdownLocator = '#language-selector';
    saveButtonLocator = '//button[text()="Save" or text()="Guardar"]'

    // Travelers
    travelersLocator = '//label[text()="Travelers"]/parent::*'
    travelersHeadingLocator = '//h3[text()="Travelers"]'
    adultCountForRoomLocatorStart = '//h3[text()="'
    adultCountForRoomLocatorEnd = '"]/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]'

    changeAdultCountForRoomLocatorSt
    
    art = '//h3[text()="'
    decreaseAdultCountForRoomLocatorEnd = '"]/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]/preceding-sibling::button'
    increaseAdultCountForRoomLocatorEnd = '"]/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]/following-sibling::button'




    // Destination
    goingToLocator = '//button[@aria-label="Going to"]';
    goingToTypeLocator = '#destination_form_field';
    autoSuggestionsLocator = '//div[@class="truncate"]//strong';

    // Calendar
    calendarOpenLocator = '#date_form_field-btn';
    
    allDatesLocator_starts = '//button[starts-with(@aria-label, "'
    allDatesLocator_ends = '")]'

    calendarDoneButtonLocator = '//button[text()="Done" and @data-stid]';
    nextCalendarButtonLocator = '(//button[@data-stid="date-picker-paging"])[2]';
    prevCalendarButtonLocator = '(//button[@data-stid="date-picker-paging"])[1]';
    leftSideCalendarHeaderLocator = '(//div[@class="uitk-date-picker-month"])[1]//h2';

    // functions to interact with the web-Elements on the HomePage
    async enterDestination(destination) {
        await this.commands.clickWebElement(this.goingToLocator);
        await this.commands.typeInWebElement(this.goingToTypeLocator, destination);
    }

    async selectFromSuggestedDestinations(userChoice) {
        await this.commands.selectFromAutoSuggestion(this.autoSuggestionsLocator, userChoice);
    }

    async openCalendar() {
        await this.commands.clickWebElement(this.calendarOpenLocator);
    }

    async selectCheckInDate(date) {
        // date = "December 5 2022"
        // 'December', '5', '2022'
        const dateArray = date.split(' ');
        await this.goToMonth(`${dateArray[0]} ${dateArray[2]}`);
        const allDatesLocator = this.allDatesLocator_starts + date.substring(0,3) + this.allDatesLocator_ends;
        await this.commands.selectDateInCalendar(allDatesLocator, dateArray[1]);
    }

    async selectCheckOutDate(date) {
        const dateArray = date.split(' ');
        await this.goToMonth(`${dateArray[0]} ${dateArray[2]}`);
        const allDatesLocator = this.allDatesLocator_starts + date.substring(0,3) + this.allDatesLocator_ends;
        await this.commands.selectDateInCalendar(allDatesLocator, dateArray[1]);
    }

    async clickDoneOnCalendar() {
        await this.commands.clickWebElement(this.calendarDoneButtonLocator);
    }

    async clickToGoToNextCalendar() {
        await this.commands.clickWebElement(this.nextCalendarButtonLocator);
    }

    async clickToGoToPrevCalendar() {
        await this.commands.clickWebElement(this.prevCalendarButtonLocator);
    }

    // 'May 2023'
    async goToMonth(monthYear) {
        /**
         * using leftSideCalendarHeaderLocator get headerElement
         * find text of webElement
         * if (text NOT equal to monthYear) 
         *      click >
         */
        let count = 1;
        while(count<=12) {
            const monthHeader = await this.commands.getTextOfWebElement(this.leftSideCalendarHeaderLocator);
            console.log(`\n monthHeader -> ${monthHeader} \n`);
            if (monthHeader.localeCompare(monthYear) === 0) {
                break;
            }
            await this.commands.clickWebElement(this.nextCalendarButtonLocator);
            await browser.pause(1000);
            count++;
        }
    }

    async getSelectedLanguage() {
        return await this.commands.getTextOfWebElement(this.languageLocator);
    }

    async changeLanguage(newLanguage) {
        await this.commands.clickWebElement(this.languageLocator);
        await this.commands.selectDataInDropdown(this.languageDropdownLocator, newLanguage);
        await this.commands.clickWebElement(this.saveButtonLocator);
    }

    async getLanguageFromWeb() {
        return await this.commands.getTextOfWebElement(this.languageLocator);
    }

    async getAdultCount(roomNum) {
        if (!await this.commands.isWebElementDisplayed(this.travelersHeadingLocator)) {
            await this.commands.clickWebElement(this.travelersLocator);
        }
        const adultCountLocator = await this.adultCountForRoomLocatorStart + roomNum + this.adultCountForRoomLocatorEnd;
        return await this.commands.getAttributeWebElement(adultCountLocator, 'value');
    }

    //h3[text()=" + Room 1 + "]/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]/preceding-sibling::button
    //h3[text()=" + Room 1 + "]/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]/following-sibling::button
    
    //h3[text()='Room 1']/following-sibling::*//input[@id="traveler_selector_adult_step_input-0"]
    async changeAdultCountInRoom(roomNum, newCount) {
        if (!await (await $(this.travelersHeadingLocator)).isDisplayed()) {
            await this.commands.clickWebElement(this.travelersLocator);
        }
        const adultCountLocator = await this.adultCountForRoomLocatorStart + roomNum + this.adultCountForRoomLocatorEnd;
        const count = Number(await this.commands.getAttributeWebElement(adultCountLocator, 'value'));

        const minusBtnLocator = this.changeAdultCountForRoomLocatorStart + roomNum + this.decreaseAdultCountForRoomLocatorEnd;
        const btnState = await this.commands.getAttributeWebElement(minusBtnLocator, 'disabled');

        let isCountReached = false;

        if (count < newCount) {
            const changeBtnLocator = this.changeAdultCountForRoomLocatorStart + roomNum + this.increaseAdultCountForRoomLocatorEnd;
            while (!isCountReached) {
                await this.commands.clickWebElement(changeBtnLocator);
                const adultCount = Number(await this.commands.getAttributeWebElement(adultCountLocator, 'value'));
                if (adultCount === newCount) {
                    isCountReached = true;
                }
            }
        } else if (count > newCount) {
            const changeBtnLocator = this.changeAdultCountForRoomLocatorStart + roomNum + this.decreaseAdultCountForRoomLocatorEnd;
            while (!isCountReached) {
                await this.commands.clickWebElement(changeBtnLocator);
                const adultCount = Number(await this.commands.getAttributeWebElement(adultCountLocator, 'value'));
                if (adultCount === newCount) {
                    isCountReached = true;
                }
            }
        }
    }

    async getBtnState(btnName, roomNum) {
        if (!await (await $(this.travelersHeadingLocator)).isDisplayed()) {
            await this.commands.clickWebElement(this.travelersLocator);
        }
        let btnState = null;
        switch(btnName) {
            case 'minus':
                const minusBtnLocator = this.changeAdultCountForRoomLocatorStart + roomNum + this.decreaseAdultCountForRoomLocatorEnd;
                btnState = await this.commands.getAttributeWebElement(minusBtnLocator, 'disabled');
                break;
            case 'plus':
                const plusBtnLocator = this.changeAdultCountForRoomLocatorStart + roomNum + this.increaseAdultCountForRoomLocatorEnd;
                btnState = await this.commands.getAttributeWebElement(plusBtnLocator, 'disabled');
                break;
        }
        return btnState;
    }
}
module.exports = HomePage;