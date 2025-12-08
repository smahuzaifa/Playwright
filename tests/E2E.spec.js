const {test, expect} = require ('@playwright/test');
const { clear } = require('console'); //Clears the terminal for cleaner output
test ("E2E automation", async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "huztest@mailinator.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
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
            /*The Playwright locator locator('button:has-text("Add To Cart")') targets a button
             element that contains the visible text "Add To Cart" anywhere inside it. 
             This selector is flexible because it matches the button based on partial text 
             content rather than exact text, making it robust against extra spaces, icons, 
             or nested elements within the button. It is commonly used to find buttons by their 
             label in a human-readable way during automated testing.
            */
            break; //Since we have already found the product the remaining iterations arent't required
        }; //Chaining locators
    }
    const cart = await page.locator("[routerLink*='cart']");
    await cart.click();
    await page.locator("div li").first().waitFor(); 
    //Waiting for if any of elements are visible
    const itemPresent = await page.locator("h3:has-text('ZARA COAT 3')");
    //isVisible does not have autowaiting so we have added explicit wait
    await expect(itemPresent).toBeVisible();
    const checkOut = await page.locator("button:has-text('Checkout')")
    checkOut.click();
    //To fill in the values in the country field on check out
    //Fill() will not work as we need to type characters sequentially
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
    //adds a delay of 150ms for every character
    const options = page.locator(".ta-results");
    await options.waitFor();
    //Chaining locators
    //Handling auto suggestion dropdowns
    const optionCount = await options.locator("button").count();
    for(let i=0;i<optionCount;i++){
        const countryOptions = await options.locator("button").nth(i).textContent();{
            if(countryOptions.trim() === "India")
//The .trim() method is a common function in programming languages and software applications 
// used to remove leading and trailing whitespace characters from a string.
            {
               await options.locator("button").nth(i).click();
               break;
            }
        }
    }
    await expect(page.locator(".details__user label")).toHaveText(email);
    //CVV
    const cvvfield = await page.locator(".field.small:nth-of-type(2) input");
    await cvvfield.fill("123");
    //NameOnCard
    const nameOnCard = await page.locator(".row:nth-of-type(3) input");
    await nameOnCard.fill("ABC")
    const placeOrder = await page.locator(".actions a");
    await placeOrder.click();
    await page.locator(".order-summary").first().waitFor("visible");
    //Final Page
    const orderIatLast = await page.locator(".box .ng-star-inserted label").textContent();
    console.log("The order ID mentioned on the checkout page is "+orderIatLast);
    const topBar = await page.locator("[routerlink*='dashboard']").allTextContents();
    console.log(topBar);
    //Moving to the order page
    const orders =await page.locator("[routerlink*='dashboard']").nth(2).click();
    await expect(page.locator(".container.table-responsive.py-5")).toBeVisible();
    console.log("The order page has opened");
    const orderRows = page.locator("tbody tr");
    await orderRows.first().waitFor({ state: 'visible', timeout: 5000 });
    const orderRowsCount = await orderRows.count();
    for( let i=0; i< orderRowsCount; i++){
        await orderRows.first().waitFor({ state: 'visible', timeout: 5000 });
        const orderID2 = await orderRows.nth(i).locator("th").textContent();
        console.log(orderID2);
        if(orderIatLast.includes(orderID2)){
            await orderRows.nth(i).locator("button").first().click();
            console.log("If conditions has matched")
            break;
        }
        else console.log("If condition has failed");
    }
    const finalOrderID = await page.locator(".col-text.-main").toBeVisible().textContent();
    expect(orderIatLast.includes(finalOrderID)).toBeTruthy;

    
});
