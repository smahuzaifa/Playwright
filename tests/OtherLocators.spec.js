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
        await page.getByRole("link",{name:'Shop'}).click();
        await page.locator(".row").first().isVisible();
        await page.getByRole("link",{name:'Nokia Edge'}).click();
        await page.getByRole("link",{name:'Shop'}).click();
        await page.locator(".row").first().isVisible();
        await page.locator("app-card").filter({hasText:"Blackberry"}).getByRole("button").click();
        //getByRole("button",{name:'Add '}) need not be added in full since there is only one in the chain 
        //Another way to select when a locator returns multiple elements
        
});