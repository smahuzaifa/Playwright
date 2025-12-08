const {test, expect} = require ('@playwright/test')
let webContext;

test.beforeAll('Injecting Session data',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("huztest@mailinator.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
    await context.storageState({path:'state.json'})
    webContext = await browser.newContext({storageState:'state.json'})
});

test('End to end post login',async ({browser})=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    await page.locator(".container div").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:' Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".cart").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:'Checkout'}).click();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
    await page.getByRole("button",{name:'India'}).nth(1).click();
    // await expect(page.locator(".details__user label")).toHaveText(email);
    //CVV
    const cvvfield = await page.locator(".field.small:nth-of-type(2) input");
    await cvvfield.fill("123");
    //NameOnCard
    const nameOnCard = await page.locator(".row:nth-of-type(3) input");
    await nameOnCard.fill("ABC")
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    await page.getByRole('listitem').getByText("Orders").click();
    await page.locator("ng-star-inserted").isVisible();
});