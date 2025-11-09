const {test} = require ('@playwright/test');
const { clear } = require('console');
test ("E2E automation", async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("huztest@mailinator.com");
    await page.locator("#userPassword").fill("Test@1234");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const products = page.locator(".card-body")
    await products.first().waitFor();
    /*
    In Playwright, the waitFor() method on a Locator waits for the element to reach a specific state. 
    You can pass a state option to specify which state to wait for.

Possible values for the state option in waitFor():
"visible": Waits for the element to be visible (not hidden, has non-zero size).

"hidden": Waits for the element to be hidden or detached from the DOM.

"attached": Waits for the element to be attached to the DOM.

"detached": Waits for the element to be detached from the DOM.

"stable": Waits for the element to be visible and stable (no moving, resizing).

If you leave the state option blank, the default value is "visible", meaning waitFor() waits until the 
element becomes visible on the page.
    */
    const productsTitle = await products.allTextContents(); 
    //Gets all the items or elements with the matching locator
    console.log(productsTitle);
    const count = await products.count();
    console.log(count);
    const productName = "ZARA COAT 3";
    for(let i=0;i<count;++i){
        if(await products.nth(i).evaluate(node => node.closest('.card-body').querySelector('h5')?.textContent)
){
            console.log("Found the product");
            await products.nth(i).locator('button:has-text("Add To Cart")').click();
            break; //Since we have already found the product the remaining iterations arent't required
        }; //Chaining locators
    }
    await page.pause();

});