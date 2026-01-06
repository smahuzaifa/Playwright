const {test, expect} = require('@playwright/test');
test('Capturing Screenshot',async({page})=>{
    page.goto("https://rahulshettyacademy.com/AutomationPractice/", { waitUntil: 'domcontentloaded', timeout: 30000 });
    const hideShowBox = page.locator("#displayed-text");
    await expect(hideShowBox).toBeVisible(); //Asserts if the element is visible
    await hideShowBox.screenshot({path: 'visiblecreenshot.png'});
    await page.getByRole("button",{name:'Hide'}).click();
    await page.screenshot({path: 'hiddenscreenshot.png'})
    await expect(hideShowBox).toBeHidden(); //Asserts if the element is hidden
    await page.getByRole("button",{name:'Confirm'}).click();


});