const {test, expect} = require('@playwright/test');
const { LoginPage } = require('./pageObjects/LoginPage');
const { Dashboard } = require('./pageObjects/DashboardPage');
test.only ('Client App Login with PageObejcts',async ({page})=>
{
    const userName = "huztest@mailinator.com";
    const password = "Test@1234"
    const loginPage = new LoginPage(page);
    //Login Page
    await loginPage.goToLoginPage();
    await loginPage.signIn(userName,password);
    //Dashboard
    const dashboardPage = new Dashboard(page);
    const productName = "ZARA COAT 3";
    dashboardPage.searchProducts(productName);
}); 