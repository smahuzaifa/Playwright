const {test,expect} = require ('@playwright/test')
test ("More validations",async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack(); //To go to the previous page or the back button on the browser
    await page.goForward(); //The forward button on the browser
    await page.goBack();
    //Hide and Show assertion
    const hideShowBox = page.locator("#displayed-text");
    await expect(hideShowBox).toBeVisible(); //Asserts if the element is visible
    await page.getByRole("button",{name:'Hide'}).click();
    await expect(hideShowBox).toBeHidden(); //Asserts if the element is hidden

    await page.getByRole("button",{name:'Confirm'}).click();
    //Handling dialog box or popup
    page.on("dialog",dialog => dialog.accept());
    //to press cancel we will use the dismiss(): dialog.accept()

    //Hovering
    await page.locator("#mousehover").hover();

    //Handling iFrames
    const iFrame = page.frameLocator("#courses-iframe");
    //We can then continue automating it using the new handler
    // await iFrame.locator("#Login").click();
    await page.pause();


});