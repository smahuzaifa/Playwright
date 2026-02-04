const {test, expect} = require('@playwright/test');

const { PageObjectManager } = require('./pageObjects/PageObjectManager');
test.only ('Client App Login with PageObejcts',async ({page})=>
{
    const userName = "huztest@mailinator.com";
    const password = "Test@1234"
    const pageObjectManager = new PageObjectManager(page); //All the objects are created here
    const loginPage = pageObjectManager.goTologinPage();
    //Login Page
    await loginPage.goToLoginPage();
    await loginPage.signIn(userName,password);
    //Dashboard
    const dashboardPage = pageObjectManager.goTodashboardPage();
    const productName = "ZARA COAT 3";
    dashboardPage.searchProducts(productName);
}); 