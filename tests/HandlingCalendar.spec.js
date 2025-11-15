const {test, expect} = require ('@playwright/test');
test ("Calendar Automation", async({page}) =>
{
    const month ='6'; const date = '15'; const year='2027' ;
    const calendarList = [month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from").click();
    //Double click to open year picker
    await page.locator(".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from").click();
    await page.getByText(year).click();
    const allMonths = page.locator(".react-calendar__tile.react-calendar__year-view__months__month");
    //This will store 12 elements(month)
    await allMonths.nth(Number(month-1)).click();
    //Since we want to click on June which is 6th month, we will go month-1 which is 5th index
    //which is where June would be. We will also be doing type conversion since the
    //month variable is a string
    await page.locator("//abbr[text()='15']").click();
    const inputList = page.locator(".react-date-picker__inputGroup__input");
    for(let i=0;i<calendarList.length;i++){
        console.log("Entered the for loop");
        const value = await inputList.nth(i).inputValue();
        expect(value).toEqual(calendarList[i]);
    }



});
