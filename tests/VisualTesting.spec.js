const{test, expect} = require('@playwright/test')
test('Visual Testing',async({page})=>{
    await page.goto("https://help.netflix.com/legal/fastprivacy");
    expect(await page.screenshot()).toMatchSnapshot('landingPage');
})