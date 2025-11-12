const {test, expect} = require ('@playwright/test');

test('Other locators',async ({page})=>
    {
        //GetByLabel
        await page.goto("https://rahulshettyacademy.com/angularpractice");
        console.log((await page.locator(".jumbotron").isVisible()));
        await page.getByLabel("Check me out if you Love IceCreams!").click();
        await page.getByLabel("Gender").selectOption("Female");
        await page.getByLabel("Employed").check();
        await page.locator(".form-group input[name='name']").fill("Test");
        await page.locator(".form-group input[name='email']").fill("123@gmail.com");
        //GetByPlaceholder
        await page.getByPlaceholder("Password").fill("12345678");
        //GetByRole
        await page.getByRole("button",{name: 'Submit'}).click();
        
});