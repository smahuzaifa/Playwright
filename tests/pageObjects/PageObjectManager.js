const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");

class PageObjectManager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }
    goTologinPage(){
        return this.loginPage;
    }
    goTodashboardPage(){
        return this.dashboardPage;
    }
}
module.exports = {PageObjectManager};