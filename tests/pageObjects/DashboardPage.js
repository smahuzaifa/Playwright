class Dashboard{
    constructor(page){
        this.page=page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b")

    }
    async searchProducts(productName){
        await this.products.first().waitFor()
        const productsTitle = await this.productsText.allTextContents(); 
        console.log(productsTitle);
        const count = await this.products.count();  
        console.log(count);
        for(let i=0;i<count;++i){
            if(await this.products.nth(i).evaluate(node => node.closest('.card-body').querySelector('h5')?.textContent)
    ){
                console.log("Found the product");
                await this.products.nth(i).locator('button:has-text("Add To Cart")').click();
                break; 
            };
        }
        }
}
module.exports = {Dashboard}