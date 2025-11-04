const {test} = require('@playwright/test');
//Imports annotation from their jar

test('First Playwright test',function ()
{
//The code goes here
});

//To avoid function, or use a function that has no name
test('Second playright test', async ()=>
{

});

//To use a browser
test('Third playright test', async ({browser})=> //Wrapped in curly braces to be recognised as 
// playwright fixture. Otherwise it will be considered as a string
{
    const context = await browser.newContext();
    //This method helps to open a fresh instance of a browser more like an incognito mode
    const page = await context.newPage();
    //Creates an actual page to automate
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //Opens the defined URL
});

//Another way to do the same as above
test('Fourth playright test', async ({browser,page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //Opens the defined URL
});