const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');
test ('UI Controls',async ({browser,page})=>
{
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult"), //Selecting a dropdown
    //Radio button
    await page.locator(".radiotextsty").last().click();
    //assertion
    expect(page.locator(".radiotextsty").last()).toBeChecked();
    await console.log(page.locator(".radiotextsty").last().isChecked);//will print true or false
    await page.locator("#okayBtn").click();
    //clicking radiobutton
    await page.locator("#terms").check();//Clicks on the checkbox
    await expect(page.locator("#terms")).toBeChecked(); //, and then checks
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //Await should be performed based on where in the brackets or scope if an action is performed.
    //To automate if a text or link is blinking. HTML has a blinkinText class
    const documentLink = page.locator(".blinkinText");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});
test.only("Child Window test", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    //If a new page is opened, then we must inform the computer
    //Whenever we want a set of step to run in parallel
    const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            documentLink.click(),
        ])
        //Copying the context of the original page
        //The expectation of this array is that it will return fullfilled promises of all its elements.
        //If any promise is not fulfilled then the script will fail.
    //Asyncronously = parallel, we have to use Promise
     const text = await newPage.locator(".red").textContent();
     console.log(text);
});