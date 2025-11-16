const {test,expect} = require ('@playwright/test')
test ("Handling dialogues or pop-ups", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByRole("button",{name:'Confirm'}).click();
    //Handling dialog box or popup
    page.on("dialog",dialog => dialog.accept());
    //to press cancel we will use the dismiss(): dialog.accept()
    

});
