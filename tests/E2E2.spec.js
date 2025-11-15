const {test, expect} = require ('@playwright/test');
const { clear } = require('console');
test ("E2E automation", async({page}) =>
{
    const email = "huztest@mailinator.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Test@1234");
    await page.getByRole("button",{name:'Login'}).click();
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
    await expect(page.locator(".details__user label")).toHaveText(email);
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
    await page.pause();

});
