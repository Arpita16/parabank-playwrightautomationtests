import { Page,expect} from "@playwright/test";
import { writeFileSync } from "fs";



export class OpenAccountPage {

constructor(public page: Page){
        this.page = page;
        
    }
    async navigateToOpenAccount() {
        await this.page.getByRole('link',{name:'Open New Account'}).click();
    }

    async openSavingsAccount() {
        await this.page.selectOption("#type", "1"); // 1 = Savings
        await this.page.waitForSelector('select#fromAccountId.input')
        await this.page.getByRole('button',{name:'Open New Account'}).click(); 
}   

    async validateAccountOpened() {
        await this.page.waitForLoadState();
       const msg=await this.page.locator('#openAccountResult').textContent();
       console.log(msg);
        await expect(this.page.locator('#openAccountResult')).toContainText('Account Opened!');
        await expect(this.page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.');
    }
    async capturedSavingsAccount(){
         
        await this.page.waitForSelector(`//div[@id='openAccountResult']//p//a[@id='newAccountId']`,{state:"visible"});
        const accountNumber= await this.page.locator(`//div[@id='openAccountResult']//p//a[@id='newAccountId']`).textContent();
      
            const accountData = {
                 accountNumber: accountNumber
            };
         
           writeFileSync('D:\\Parabank-PlaywrightTests\\utils\\savingsAccount.json', JSON.stringify( accountData));
           
         expect(accountNumber).toBeDefined();
         
     }
    
}


