const {test, expect} = require('@playwright/test');
//Imports annotation from their jar
test('First Playwright test',function ()
{
//The code goes here
});

//To avoid function, or use a function that has no name
test('Second playright test', async ()=> //Anonymous function is one that has no name
{

});
//await: wait till the previous step is finished 
//whenever we use await we have to use async, they go hand in hand
//await only gets avtivated when the function is marked async.
//To use a browser
test('Third playright test', async ({browser})=> //Wrapped in curly braces to be recognised as 
// playwright fixture. Otherwise it will be considered as a string
{
    const context = await browser.newContext();
    //This method helps to open a fresh instance of a browser more like an incognito mode
    const page = await context.newPage();
    //Creates an actual page to automate
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //Opens the defined URL
    console.log(await page.title())
    //Css and Xpath to identify unique elements on an webpage
    await page.locator('#username').fill("rahulshetty") //We can also decalre the locator as a variable to
    //imporve code readability
    await page.locator("[type='password']").fill("learning")
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    //Assertion
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")
    await userName.fill(""), //This clears the previously entered value in the field
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    const cardTitle = page.locator(".card-body a");
    console.log(await page.locator(".card-body a").first().textContent()); //iPhone X
    console.log(await page.locator(".card-body a").nth(1).textContent()); //Samsung Note 8
    //To grab text of all products in a list format in single step
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);

});
//By using .only we can explicitly ask it to run just one test which has only
//Another way to do the same as above
test('Fourth playright test', async ({browser,page})=> //Automatic context and fresh page ism opened using
//default context.
{
    await page.goto("https://google.com");
    //Opens the defined URL
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
});