class LoginPage{
    constructor(page){
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword")
    }
    async goToLoginPage(){
        await this.page.context().clearCookies();
        await this.page.goto("https://rahulshettyacademy.com/client", {
            waitUntil: "load",
            timeout: 60000 
        });
    }
    async signIn(userName, password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = {LoginPage};