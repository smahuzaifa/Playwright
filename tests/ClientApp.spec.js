const {test, expect} = require('@playwright/test');
test.only ('Client App Login',async ({browser,page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("huztest@mailinator.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    //console.log(await page.locator(".card-body b").first().textContent());
    //If the above statement is not present then the below statement will return an empty array
    //to avoid this we will use wait till network calls are loaded
    await page.waitForLoadState('networkidle'); //this will wait till all network calls are made
    //Alternate way would be to wait for the locator
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
});